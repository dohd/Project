import React, { useState } from 'react';
import { Form, message } from 'antd';
import UrlPattern from 'url-pattern';

import ActivityPlans from './ActivityPlans';
import CreatePlanModal from './CreatePlanModal';
import Api from 'api';
import { useActivityPlanContext } from 'contexts';
import { Path } from 'routes';

export default function ActivityPlansContainer({ match, history }) {
    const { activityId } = match.params;

    const [visible, setVisible] = useState(false);
    const toggleCreatePlan = () => setVisible(true);

    const [state, setState] = useState({ events: [ [],[] ] });

    const { fetchActivityPlans } = useActivityPlanContext();
    const [form] = Form.useForm();
    const onFinish = values => {
        values.activityId = activityId;
        values.events = state.events[0].map((val, i) => ({
            date: val, regions: [...state.events[1][i]]
        }));
        values.programmeId = values.programme;
        delete values.programme;

        Api.activityPlan.post(values)
        .then(res => {
            form.resetFields();
            message.success('Form submitted successfully');
            fetchActivityPlans();
        })
        .catch(err => {
            console.log(err);
            message.error('Unknown error!');
        });
    };
    const onFinishFailed = err => console.log('Error:',err);

    const participantsPage = key => {
        const params = new UrlPattern(Path.activityPlans()).match(match.url);
        const pattern = new UrlPattern(Path.participants());
        const path = pattern.stringify({ activityPlanId: key, ...params });
        history.push(path);
    };

    const modal_props = { 
        visible, setVisible, state, setState, onFinish,
        onFinishFailed
    };
    const props = { history, toggleCreatePlan, participantsPage };
    return (
        <div>
            <ActivityPlans {...props} />
            <CreatePlanModal {...modal_props} />
        </div>
    );
}