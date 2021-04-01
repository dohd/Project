import React from 'react';
import { Form } from 'antd';

import AddUserView from './AddUserView';
import Api from 'api';

export default function CreateUser(props) {
    const { 
        fetchUsers, visible, 
        setVisible, userRoles 
    } = props;

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(prev => ({...prev, create: false}));
        Api.user.post(values)
        .then(res => {
            fetchUsers();
            form.resetFields();
        })
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, create: false}));
    
    const checkName = (rule, value) => {
        const regex = new RegExp(/^([a-zA-Z]{2,})\s([a-zA-Z]{2,})$/);
        if (!value) return Promise.reject('username is required');
        if (regex.test(value)) return Promise.resolve();
        return Promise.reject('username is invalid');
    };

    const checkInitial = (rule, value) => {
        const regex = new RegExp(/^([a-zA-Z])\.([a-zA-Z]{2,})$/)
        if (!value) return Promise.reject('initial is required');
        if (regex.test(value)) return Promise.resolve();
        return Promise.reject('initial is invalid');
    };
    
    const params = {
        form, visible, onOk, onCancel,
        checkName, checkInitial, userRoles
    };
    return <AddUserView {...params} />;
}