import React, { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { useParams } from 'react-router';

import ActivityPlans from './ActivityPlans';
import CreatePlanModal from './CreatePlanModal';
import Api from 'api';
import { useTracked } from 'context';
import { clientSocket } from 'utils';

const fetchActivityPlans = async dispatch => {
    const activityPlans = await Api.activityPlan.get();
    const activitySchedule = await Api.activitySchedule.get();
    dispatch({
        type: "addActivityPlans",
        payload: activityPlans
    });

    const eventsDataMap = {activityPlans, activitySchedule};
    for (const event in eventsDataMap) {
        clientSocket.emit(event, eventsDataMap[event]);
    }
};

export default function ActivityPlansContainer() {
    const [store, dispatch] = useTracked();
    const { activityId } = useParams();

    const [activityPlans, setActivityPlans] = useState([]);
    useEffect(() => {
        const plans = store.activityPlans.filter(v => {
            if (v.activity.id === parseInt(activityId)) {
                v.key = v.id;
                v.plan = v.title;
                return true;
            }
            return false;
        });
        setActivityPlans(plans);
    }, [store.activityPlans, activityId]);

    // Modal logic
    const [visible, setVisible] = useState(false);
    const [state, setState] = useState({ 
        events: [ [],[] ] 
    });

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(false);
        values.events = state.events[0].map((val, i) => ({
            date: val, regions: [...state.events[1][i]]
        }));
        values.activityId = activityId;
        values.programmeId = values.programme;
        delete values.programme;

        Api.activityPlan.post(values)
        .then(res => {
            form.resetFields();
            message.success('Activity plan saved successfully');
            fetchActivityPlans(dispatch);
        });
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validation failed:',err))
    };

    const modal_props = { 
        visible, setVisible, state, setState, 
        form, onOk,
        keyProgrammes: store.keyProgrammes,
        targetGroups: store.targetGroups,
        targetRegions: store.targetRegions
    };
    const plan_props = { setVisible, activityPlans };
    return (
        <>
            <CreatePlanModal {...modal_props} />
            <ActivityPlans {...plan_props} />
        </>
    );
}
