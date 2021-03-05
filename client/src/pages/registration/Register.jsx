import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Input } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Path } from 'routes';
import OrgProfile from './OrgProfile';
import './register.css';

const layout = { labelCol: { span: 16 }, wrapperCol: { span: 24 } };
const tailLayout = { wrapperCol: { span: 24 } };

export default function Register({ history }) {
    const [state, setState] = useState({
       register: {}, 
       home: false,  
       profile: false,
    });

    if (state.profile) return (
        <OrgProfile state={state} setState={setState} history={history} />
    );
    return <Credentials state={state} setState={setState} />;
}

function Credentials({ state, setState }) {
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
        if (Object.keys(register).length) {
            form.setFieldsValue({
                orgName: register.orgName,
                username: register.username,
                email: register.email,
                password: register.password,
                confirm: register.confirm
            });
        }
    }, [state, form]);

    const nameValidator = (rule, value) => {
        const regex = new RegExp(/^([a-zA-Z]{2,})\s([a-zA-Z]{2,})$/);
        if (!value) return Promise.reject('username is required');
        if (regex.test(value)) return Promise.resolve();
        return Promise.reject('username is invalid');
    };

    const confirmValidator = ({ getFieldValue }) => ({
        validator(rule, value) {
            if(!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('passwords do not match!')
        }
    });

    return (
        <div className='landing-container'>
            <div className='register'>
                <Card
                    title='Create Account'
                >
                    <Form
                        {...layout}
                        form={form}
                        layout='vertical'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{ remember: true }}
                    >   
                        <Form.Item 
                            label='Organisation Name' 
                            name='orgName'
                            rules={[{ 
                                required: true,
                                message: 'organisation name is required'
                            }]}
                        >
                            <Input maxLength={55} />
                        </Form.Item>
                        <Form.Item 
                            label='Username' 
                            name='username'
                            rules={[{ 
                                required: true,
                                validator: nameValidator
                            }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder='e.g John Doe' />
                        </Form.Item>
                        <Form.Item 
                            label='Email' 
                            name='email'
                            rules={[{ required: true }]}
                        >
                            <Input type='email' prefix={<MailOutlined />} />
                        </Form.Item>
                        <Form.Item 
                            label='Password' 
                            name='password'
                            rules={[{ required: true }]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item 
                            label='Confirm' 
                            name='confirm'
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'confirm your password!'
                                },
                                confirmValidator
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button 
                                type='primary' 
                                htmlType='submit'
                                block
                            >
                                Next
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <p className='loginText'>
                    Already have an account? &nbsp;
                    <Link to={Path.login()}>
                        <span className='whiteText'>Sign in</span>
                    </Link>
                </p>
            </div>
        </div>
    );
}