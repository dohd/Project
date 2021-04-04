import React from 'react';
import { Form } from 'antd';

import Tab4View from './Tab4View';

export default function Tab2(props) {
    const {
        nextTab, prevTab, setState, 
        activityList, showModal, onSave
    } = props;

    const [formG] = Form.useForm();
    const onFinishG = values => {
        values.narrativeQuizId = 7;
        setState(prev => {
            let exists = false;
            prev.formG.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formG: [...prev.formG, values]};
        });
        formG.resetFields();
        onSave();
    };
    const onFinishFailedG = err => console.log('Error:',err);

    const [formH] = Form.useForm();
    const onFinishH = values => {
        values.narrativeQuizId = 8;
        setState(prev => {
            let exists = false;
            prev.formH.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formH: [...prev.formH, values]};
        });
        formH.resetFields();
        onSave();
    };
    const onFinishFailedH = err => console.log('Error:',err);

    const params = {
        showModal, activityList, prevTab,
        nextTab, formG, onFinishG, onFinishFailedG,
        formH, onFinishH, onFinishFailedH
    };
    return <Tab4View {...params} />;
}
