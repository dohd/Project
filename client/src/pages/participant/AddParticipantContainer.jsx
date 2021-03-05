import React, { useState, useEffect } from 'react';
import { useParticipantContext, useActivityPlanContext } from 'contexts';
import { Form, message } from 'antd';
import Api from 'api';
import AddParticipant, { dateFormat } from './AddParticipant';

export default function CreateParticipant({ match, history, location }) {
    const activityId = match.params.activityId || location.state.activityId;
    const { fetchParticipants } = useParticipantContext();

    const [state, setState] = useState({ programmes: []});
    const { activityPlans } = useActivityPlanContext();
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

        const [fName, lName] = name.split(' ');
        values.fName = fName;
        values.lName = lName;
        
        Api.participant.post(values)
        .then(res => {
            fetchParticipants();
            message.success('Form submitted successfully');
            form.resetFields();
        })
        .catch(err => {
            console.log(err);
            message.error('Unknown error!')
        });
    };
    const onFinishFailed = err => console.log('Error:', err);

    const props = {
        form, onFinish, onFinishFailed, history, 
        programmes: state.programmes
    };

    return <AddParticipant {...props} />;
}