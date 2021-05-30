import React from 'react';
import { Card, Form, Button, Input } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Path } from 'routes';

const layout = { labelCol: { span: 16 }, wrapperCol: { span: 24 } };
const tailLayout = { wrapperCol: { span: 24 } };

export default function BasicInfo(props) {
    const {form, onFinish, onFinishFailed} = props;

    const nameValidator = (rule, value) => {
        const regex = new RegExp(/^([a-zA-Z]{2,})\s([a-zA-Z]{2,})$/);
        if (!value) return Promise.reject('username is required');
        if (!regex.test(value)) return Promise.reject('username is invalid');
        return Promise.resolve();
    };

    const confirmValidator = ({getFieldValue}) => ({
        validator: (rule, value) => {
            const isValid = !value || getFieldValue('password') === value;
            if(isValid) return Promise.resolve();            
            return Promise.reject('passwords do not match!')
        }
    });

    return (
        <div className='landing-container'>
            <div className='register-basic'>
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
                    <Link to={Path.login}>
                        <span className='whiteText'>Sign in</span>
                    </Link>
                </p>
            </div>
        </div>
    ); 
}