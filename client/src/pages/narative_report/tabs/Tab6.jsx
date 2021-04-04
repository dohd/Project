import React from 'react';
import { Form } from 'antd'

import Tab6View from './Tab6View';

export default function Tab6(props) {
    const {
        prevTab, onSubmit, setState, 
        activityList, showModal, onSave
    } = props;

    const [formJ] = Form.useForm();
    const onFinishJ = values => {
        values.narrativeQuizId = 9;        
        setState(state => {
            let exists = false;
            state.formJ.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return state;
            return {...state, formJ: [...state.formJ, values]};            
        });
        formJ.resetFields();
        onSave();
    };
    const onFinishFailedJ = err => console.log('Error:',err);

    const [formK] = Form.useForm();
    const onFinishK = values => {
        values.narrativeQuizId = 10;
        setState(prev => {
            let exists = false;
            prev.formK.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formK: [...prev.formK, values]};            
        });
        formK.resetFields();
        onSave();
    };
    const onFinishFailedK = err => console.log('Error:',err);

    const params = {
        showModal, activityList, prevTab,
        onSubmit, formJ, onFinishJ, onFinishFailedJ,
        formK, onFinishK, onFinishFailedK
    };
    return <Tab6View {...params} />;
}
