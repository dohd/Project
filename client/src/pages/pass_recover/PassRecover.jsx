import React from 'react';
import { Card, Form, Input, Button, Space } from 'antd';
import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons';
import './pass_recover.css';

export default function PassRecover({ history }) {
    const [form] = Form.useForm();
    const onFinish = values => {
        console.log(values);
    };
    const onFinishFailed = err => console.log('Error:',err);

    return (
        <div className='landing-container'>
            <div className='pass-recover'>
                <Card   
                    title={
                        <Space>
                            <ArrowLeftOutlined
                                onClick={() => history.goBack()}
                                style={{ fontSize: '18px' }}
                            />
                            Recover Password
                        </Space>
                    }
                >
                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{ remember: true }}
                    >
                        <Form.Item 
                            label='Email'
                            labelCol={{ span: 8 }} 
                            wrapperCol={{ span: 24 }}
                            name='email'
                            rules={[{ required: true }]}
                            required={false}
                        >
                            <Input type='email' prefix={<MailOutlined />} />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 24 }}
                        >
                            <Button type='primary' htmlType='submit' block>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}