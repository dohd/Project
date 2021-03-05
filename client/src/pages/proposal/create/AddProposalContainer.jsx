import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { useProposalContext, useDonorContext } from 'contexts';
import Api from 'api';
import AddProposal, { dateFormat } from './AddProposal';

export default function AddProposalContainer({ history }) {
    const { fetchProposals } = useProposalContext();
    const { donors } = useDonorContext();
    const [state, setState] = useState({
        objectives: [ [],[] ], donors: []
    });

    useEffect(() => {
        const list = donors.map(val => ({ 
            id: val.id, name: val.name
        }));
        setState(prev => ({...prev, donors: list}));
    }, [donors]);

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
            fetchProposals();
            message.success('Form submitted successfully');
            form.resetFields();
        })
        .catch(err => {
            console.log(err);
            message.error('Unknown error!')
        });
    };
    const onFinishFailed = err => console.log('Error:',err);

    const props = {
        state, setState, form, 
        onFinish, onFinishFailed, history
    };
    
    return <AddProposal {...props} />;
}