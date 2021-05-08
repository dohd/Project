import React from 'react';
import { Card, Form, Button, Input, Space } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './login.css';

import { Path } from 'routes';

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 24 } };
const tailLayout = { wrapperCol: { span: 24 } };

export default function Login(props) {
    const { onFinish, onFinishFailed, isLoading } = props;
    
    return (
        <div className='landing-container'>
            <div className='login'>
                <Card
                    title={
                        <Space>
                            <UserOutlined /> User Login
                        </Space>
                    }
                >
                    <Form
                        {...layout}
                        layout='vertical'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{ remember: true }}
                    >
                        <Form.Item 
                            label='Email' 
                            name='email'
                            rules={[{ required: true }]}
                            required={false}
                        >
                            <Input type='email' prefix={<MailOutlined />}/>
                        </Form.Item>
                        <Form.Item 
                            label='Password' 
                            name='password' 
                            rules={[{ required: true }]}
                            required={false}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button 
                                type='primary' 
                                htmlType='submit' 
                                loading={isLoading} 
                                block
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link to={Path.passwordRecover}>
                        <p className='passwordText'>Forgot password ?</p>
                    </Link>
                </Card>
                <p className='registerText'>
                    Don't have an account? &nbsp;
                    <Link to={Path.register}>
                        <span className='whiteText'>Register</span>
                    </Link>
                </p>
            </div>
        </div>
    );
}