import React, { useState } from 'react';
import { Form } from 'antd'

import Tab6View from './Tab6View';
import TitleModal from '../TitleModal';

export default function Tab6(props) {
    const {
        prevTab, setState, activityList, 
        showModal, onSave, onSubmit
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

    // modal logic
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(false);
        form.resetFields();
        onSubmit(values);
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(info => console.log('Validate Failed:', info));
    };

    const modal_props = { visible, setVisible, onOk, form };

    const tab6_props = {
        showModal, activityList, prevTab,
        formJ, onFinishJ, onFinishFailedJ,
        formK, onFinishK, onFinishFailedK, 
        setVisible
    };
    return (
        <>
            <TitleModal {...modal_props} />
            <Tab6View {...tab6_props} />;
        </>
    );
}
