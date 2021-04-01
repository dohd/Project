import React, { useEffect } from 'react';
import { Form } from 'antd';

import EditUserView from './EditUserView';
import Api from 'api';

export default function UserModal(props) {
    const { 
        record, fetchUsers, visible, 
        setVisible, userRoles
    } = props;

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(prev => ({...prev, update: false}));
        Api.user.patch(record.key, values)
        .then(res => fetchUsers());
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, update: false}));

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

    useEffect(() => {
        if (record.hasOwnProperty('username')) {
            form.setFieldsValue({
                username: record.username,
                initial: record.initial,
                email: record.email,
                roleId: record.role.id
            });    
        }
    }, [record, form]);

    const params = {
        userRoles, visible, onCancel, onOk,
        form, checkName, checkInitial
    };
    return <EditUserView {...params} />
}