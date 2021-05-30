import React, { useEffect,  useState } from 'react';
import { Form, message } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router';

import  EditParticipant, { dateFormat } from './EditParticipant';
import Api from 'api';
import { useTracked } from 'context';

const fetchParticipants = dispatch => {
    Api.participant.get()
    .then(res => dispatch({
        type: 'addParticipants',
        payload: res
    }));
};

export default function UpdateParticipant() {
    const [store, dispatch] = useTracked();
    const { 
        activityId, participantId, 
        activityPlanId 
    } = useParams();

    const [state, setState] = useState({
        keyProgramme: {}, regions: []
    });

    useEffect(() => {
        const plans = store.activityPlans;

        for(const p of plans) {
            if (p.id === parseInt(activityPlanId)) {
                const keyProgramme = p.planProgramme.keyProgramme;
                let regions = [];
                p.planEvents.forEach(event => {
                    event.planRegions.forEach(v => {
                        regions.push(v.region);
                    });
                });
                // Unique region areas
                const regionObj = regions.reduce((r, c) => {
                    const key = '_' + c.area;
                    if (!r[key]) r[key] = c;
                    return r;
                }, {});

                regions = Object.values(regionObj);
                setState({keyProgramme, regions});
                break;
            }
        }     
    }, [store.activityPlans, activityPlanId]);

    const onFinish = values => {
        const { activityDate, name } = values;
        values.activityDate = activityDate.format(dateFormat);
        values.activityId = activityId;

        const names = name.split(' ');
        values.fName = names[0];
        values.lName = names[1];

        Api.participant.patch(participantId, values)
        .then(res => {
            message.success('Participant updated successfully')
            fetchParticipants(dispatch);
        });
    };
    const onFinishFailed = err => console.log('Error:',err);

    const [form] = Form.useForm();

    // Initial form values
    useEffect(() => {
        for (const p of store.participants) {
            if (p.id === parseInt(participantId)) {
                form.setFieldsValue({
                    name: `${p.fName} ${p.lName}`,
                    activityDate: moment(p.activityDate, dateFormat),
                    gender: p.gender,
                    disability: p.detail.disability,
                    phone: p.detail.phone,
                    email: p.detail.email,
                    designation: p.detail.designation,
                    regionId: p.regionId,
                });
                break;
            }
        }
    }, [store.participants, form, participantId]);

    useEffect(() => {
        const { keyProgramme } = state;
        if (keyProgramme.hasOwnProperty('id')) {
            form.setFieldsValue({
                keyProgramme: keyProgramme.programme
            });
        } 
    }, [state, form]);

    const props = { form, onFinish, onFinishFailed, state };
    return <EditParticipant {...props} />;
}