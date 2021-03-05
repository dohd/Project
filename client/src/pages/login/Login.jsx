import React, { useState } from 'react';
import { Card, Form, Button, Input, message, Space } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Api from 'api';
import { Path } from 'routes';
import './login.css';

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 24 } };
const tailLayout = { wrapperCol: { span: 24 } };

export default function Login({ history }) {
    const [state, setState] = useState({ load: false });

    const onFinish = values => {
        setState({ load: true });
        Api.login.post(values)
        .then(res => {
            sessionStorage.token = res.accessToken;
            history.push(Path.home());
        })
        .catch(err => {
            console.log(err);
            setState({ load: false });
            if (err.error && err.error.message) {
                message.error(err.error.message);
            }
        });
    };
    const onFinishFailed = err => console.log('Error:', err);

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
                                loading={state.load} 
                                block
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link to={Path.passwordRecover()}>
                        <p className='passwordText'>Forgot password ?</p>
                    </Link>
                </Card>
                <p className='registerText'>
                    Don't have an account? &nbsp;
                    <Link to={Path.register()}>
                        <span className='whiteText'>Register</span>
                    </Link>
                </p>
            </div>
        </div>
    );
}