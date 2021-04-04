import React from 'react';
import { Form } from 'antd'

import Tab3View from './Tab3View';

export default function Tab3(props) {
    const {
        nextTab, prevTab, setState, 
        activityList, showModal, onSave
    } = props;

    const [formE] = Form.useForm();
    const onFinishE = values => {
        values.narrativeQuizId = 5;
        setState(prev => {
            let exists = false;
            prev.formE.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formE: [...prev.formE, values]};
        });
        formE.resetFields();
        onSave();
    };
    const onFinishFailedE = err => console.log('Error:',err);

    const [formF] = Form.useForm();
    const onFinishF = values => {
        values.narrativeQuizId = 6;
        setState(state => {
            let exists = false;
            state.formF.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return state;
            return {...state, formF: [...state.formF, values]};
        });
        formF.resetFields();
        onSave();
    };
    const onFinishFailedF = err => console.log('Error:',err);

    const params = {
        showModal, activityList, nextTab,
        prevTab, formE, onFinishE, onFinishFailedE,
        formF, onFinishF, onFinishFailedF
    };
    return <Tab3View {...params} />
}
