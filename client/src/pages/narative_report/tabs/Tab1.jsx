import React from 'react';
import { Form } from 'antd';

import Tab1View from './Tab1View';

export default function Tab1(props) {
    const {
        nextTab, setState, activityList, 
        showModal, onSave
    } = props;

    const [formA] = Form.useForm();
    const onFinishA = values => {
        values.narrativeQuizId = 1;
        setState(prev => {
            let exists = false;
            prev.formA.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formA: [...prev.formA, values]};            
        });
        formA.resetFields();   
        onSave();
    };
    const onFinishFailedA = err => console.log('Error:',err);

    const [formB] = Form.useForm();
    const onFinishB = values => {
        values.narrativeQuizId = 2;
        setState(prev => {
            let exists = false;
            prev.formB.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formB: [...prev.formB, values]};
        });
        formB.resetFields();
        onSave();
    };
    const onFinishFailedB = err => console.log('Error:',err);

    const params = {
        formA, onFinishA, onFinishFailedA, 
        showModal, activityList, formB, onFinishB,
        onFinishFailedB, nextTab
    }
    return <Tab1View {...params} />;
}