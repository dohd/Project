import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';

import AddProposal, { dateFormat } from './AddProposal';
import Api from 'api';
import { useTracked } from 'context';

const fetchProposals = dispatch => {
    Api.proposal.get()
    .then(res => dispatch({
        type: 'addProposals',
        payload: res
    }));
};

export default function AddProposalContainer({ history }) {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({
        objectives: [ [],[] ], donors: []
    });

    useEffect(() => {
        const list = store.donors.map(v => ({ 
            id: v.id, name: v.name
        }));
        setState(prev => ({...prev, donors: list}));
    }, [store.donors]);

    const [form] = Form.useForm();
    const onFinish = values => {
        const { dateSubmitted, objectives } = values;
        values.dateSubmitted = dateSubmitted.format(dateFormat);
        values.objectives = objectives.map((val, i) => ({
            objective: val, activities: [...state.objectives[1][i]]
        }));

        const period = values.period.map(val => val.format(dateFormat));
        values.startPeriod = period[0];
        values.endPeriod = period[1];
        delete values.period;

        Api.proposal.post(values)
        .then(res => {
            form.resetFields();
            message.success('Form submitted successfully');
            fetchProposals(dispatch);
        });
    };
    const onFinishFailed = err => console.log('Error:',err);

    const props = {
        state, setState, form, 
        onFinish, onFinishFailed
    };
    return <AddProposal {...props} />;
}