import React, { useEffect,  useState } from 'react';
import { Form, message } from 'antd';
import moment from 'moment';
import { useParticipantContext, useActivityPlanContext } from 'contexts';
import Api from 'api';
import  EditParticipant, { dateFormat } from './EditParticipant';

export default function UpdateParticipant({ match, history }) {
    const { activityId, participantId } = match.params;
    const { participants, fetchParticpants } = useParticipantContext();
    
    const { activityPlans } = useActivityPlanContext();
    const [state, setState] = useState({ programmes: []});

    useEffect(() => {
        const programmes = new Set();
        for (const plan of activityPlans) {
            if (plan.activity.id === Number(activityId)) {
                const { planProgramme } = plan;
                const { keyProgramme } = planProgramme;
                programmes.add(keyProgramme);
            }
        }
        setState({ programmes: [...programmes] });
    }, [activityPlans, activityId]);

    const [form] = Form.useForm();
    const onFinish = values => {
        const { activityDate, name } = values;
        values.activityDate = activityDate.format(dateFormat);
        values.activityId = activityId;

        const names = name.split(' ');
        values.fName = names[0];
        values.lName = names[1];
        delete values.name;

        Api.participant.patch(participantId, values)
        .then(res => {
            fetchParticpants();
            message.success('Participant updated successfully')
            history.goBack();
        })
        .catch(err => {
            console.log(err);
            message.error('Unknown error!')
        });
    };
    const onFinishFailed = err => console.log('Error:',err);

    // Initial form values
    useEffect(() => {
        for (const obj of participants) {
            if (obj.id === Number(participantId)) {
                form.setFieldsValue({
                    name: `${obj.fName} ${obj.lName}`,
                    activityDate: moment(obj.activityDate, dateFormat),
                    genderId: obj.gender.id,
                    disability: obj.disability,
                    phone: obj.phone,
                    email: obj.email,
                    designation: obj.designation,
                    locality: obj.locality,
                    programmeId: obj.keyProgramme.id
                });
                break;
            }
        }
    }, [participants, form, participantId]);

    const props = {
        form, onFinish, onFinishFailed, history, 
        programmes: state.programmes
    };

    return <EditParticipant {...props} />;
}