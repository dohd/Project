import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { useHistory } from 'react-router';

import './register.css';
import OrgProfile from './OrgProfile';
import BasicInfo from './BasicInfo';
import Api, { isAuth, setToken } from 'api';
import { Path } from 'routes';

export default function Register() {
    const [state, setState] = useState({
       home: false,  
       profile: false,
       register: {}, 
    });

    const props = {state, setState};
    return (
        state.profile ? 
        <OrgProfileContainer {...props} /> : 
        <BasicInfoContainer {...props} />
    );
}

function BasicInfoContainer({state, setState}) {
    const [form] = Form.useForm();
    const onFinish = values => {
        setState(prev => ({
            ...prev,
            register: values,
            profile: !prev.profile
        }));
        form.resetFields(['password']);
    };
    const onFinishFailed = err => console.log('Error:', err);

    useEffect(() => {
        const { register } = state;
        if (register.hasOwnProperty('orgName')) {
            form.setFieldsValue({
                orgName: register.orgName,
                username: register.username,
                email: register.email,
                password: register.password,
                confirm: register.confirm
            });
        }
    }, [state, form]);


    const props = {form, onFinish, onFinishFailed};
    return <BasicInfo {...props} />;
}

function OrgProfileContainer({state, setState}) {
    const handleBack = () => setState(prev => ({
        ...prev, profile: !prev.profile
    }));
    const [isLoading, setLoading] = useState(false);

    const history = useHistory();
    const Register = async data => {
        try {
            const res = await  Api.register.post(data);
            setToken(res.accessToken);
            return isAuth() && history.push(Path.home);
        } catch (error) {
            setLoading(false);
        }
    };

    const onFinish = values => {
        const data = {...state.register, ...values};
        setLoading(true);
        Register(data);
    };
    const onFinishFailed = err => console.log('Error:', err);

    const props = {isLoading, onFinish, onFinishFailed, handleBack};
    return <OrgProfile {...props} />;
}