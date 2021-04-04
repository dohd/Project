import React from 'react';
import { Form } from 'antd';

import Tab2View from './Tab2View';

export default function Tab2(props) {
    const {
        nextTab, prevTab, setState, 
        activityList, showModal, onSave
    } = props;

    const [formC] = Form.useForm();
    const onFinishC = values => {
        values.narrativeQuizId = 3;
        setState(prev => {
            let exists = false;
            prev.formC.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formC: [...prev.formC, values]};            
        });
        formC.resetFields();
        onSave();
    };
    const onFinishFailedC = err => console.log('Error:',err);

    const [formD] = Form.useForm();
    const onFinishD = values => {
        values.narrativeQuizId = 4;
        setState(prev => {
            let exists = false;
            prev.formD.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formD: [...prev.formD, values]};            
        });
        formD.resetFields();
        onSave();
    };
    const onFinishFailedD = err => console.log('Error:',err);

    const params = {
        showModal, activityList, prevTab, 
        nextTab, formC, onFinishC, onFinishFailedC,
        formD, onFinishD, onFinishFailedD
    }; 
    return <Tab2View {...params} />;
}
