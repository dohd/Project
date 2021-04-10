import React, { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { useParams } from 'react-router';

import ActivityPlans from './ActivityPlans';
import CreatePlanModal from './CreatePlanModal';
import Api from 'api';
import { useTracked } from 'context';

const fetchActivityPlans = dispatch => {
    Api.activityPlan.get()
    .then(res => dispatch({
        type: "addActivityPlans",
        payload: res
    }));
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
    const toggleCreatePlan = () => setVisible(true);

    const [state, setState] = useState({ 
        events: [ [],[] ] 
    });
    const [form] = Form.useForm();

    const onFinish = values => {
        values.events = state.events[0].map((val, i) => ({
            date: val, regions: [...state.events[1][i]]
        }));
        values.activityId = activityId;
        values.programmeId = values.programme;
        delete values.programme;

        Api.activityPlan.post(values)
        .then(res => {
            form.resetFields();
            message.success('Form submitted successfully');
            fetchActivityPlans(dispatch);
        });
    };
    const onFinishFailed = err => console.log('Error:', err);

    const modal_props = { 
        visible, setVisible, state, setState, 
        onFinish, onFinishFailed, form
    };
    const plan_props = { toggleCreatePlan, activityPlans };
    return (
        <>
            <ActivityPlans {...plan_props} />
            <CreatePlanModal {...modal_props} />
        </>
    );
}
