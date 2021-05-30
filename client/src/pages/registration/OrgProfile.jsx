import React from 'react';
import { Card, Form, Input, Button, Space } from 'antd';
import { ArrowLeftOutlined, UserOutlined, MailOutlined  } from '@ant-design/icons';

const layout = { labelCol: { span: 5 }, wrapperCol: { span: 18 } };
const tailLayout = { wrapperCol: { span: 18, offset: 4 } };

export default function OrgProfile(props) {
    const {
        isLoading, onFinish, onFinishFailed,
        handleBack
    } = props;

    const nameValidator = (rule, value) => {
        const regex = new RegExp(/^([a-zA-Z]{2,})\s([a-zA-Z]{2,})$/);
        if (!value) return Promise.reject('name is required');
        if (!regex.test(value)) return Promise.reject('first and last name is required');
        return Promise.resolve();
    };

    return (
        <div className='landing-container' >
            <div className='register-profile' >
                <Card
                    title={
                        <Space>
                            <ArrowLeftOutlined
                                onClick={handleBack}
                                style={{ fontSize: '18px' }}
                            />
                            Organisation Profile
                        </Space>
                    }
                >
                    <Form
                        {...layout}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label='Key Name'
                            name='keyName'
                            rules={[{
                                required: true,
                                message: 'key name is required'
                            }]}
                        >
                            <Input maxLength={10} />
                        </Form.Item>
                        
                        <Form.Item
                            label='Telephone'
                            name='orgTelephone'
                            rules={[{ 
                                required: true,
                                message: 'telephone is required'
                            }]}
                        >
                            <Input type='tel' maxLength={15} />
                        </Form.Item>
                        
                        <Form.Item
                            labelCol={{ offset: 2 }}
                            label='Email'
                            name='orgEmail'
                            rules={[{ 
                                required: true,
                                message: 'email is required'
                            }]}
                        >
                            <Input type='email' prefix={<MailOutlined />} />
                        </Form.Item>
                        
                        <legend>Contact Person</legend>
                        <Form.Item
                            labelCol={{ offset: 2 }}
                            label='Name'
                            name='name'
                            rules={[{
                                required: true,
                                validator: nameValidator
                            }]}
                        >
                            <Input placeholder='e.g John Doe' prefix={<UserOutlined />}/>
                        </Form.Item>                        
                        
                        <Form.Item
                            label='Telephone'
                            name='cpTelephone'
                            rules={[{
                                required: true,
                                message: 'telephone is required'
                            }]}
                        >
                            <Input type='tel' maxLength={15} />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ offset: 2 }}
                            label='Email'
                            name='cpEmail'
                            rules={[{ required: true }]}
                        >
                            <Input type='email' prefix={<MailOutlined />} />
                        </Form.Item>
                        
                        <Form.Item
                            {...tailLayout}
                        >
                            <Button
                                type='primary'
                                htmlType='submit'
                                loading={isLoading}
                                block
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}