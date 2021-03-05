import React from 'react';
import { Form, Row, Col, Button, Input, message } from 'antd';
import Api from 'api';

const layout = { wrapperCol: { span: 22 } };

export default function Password() {
    const [form] = Form.useForm();
    const onFinish = values => {
        Api.resetPassword.post(values)
        .then(res => message.success('Password updated successfully'))
        .catch(err => {
            console.log(err);
            message.error('Unknown error!');
        });
        form.resetFields();
    };
    const onFinishFailed = err => console.log('Error:',err);

    const confirmValidator = ({ getFieldValue }) => ({
        validator(rule, value) {
            if(!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
            }
            return Promise.reject('passwords do not match!')
        }
    });

    return (
        <Form 
            {...layout} 
            form={form}
            layout='vertical' 
            requiredMark={false}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <legend>Change Password</legend>
            <Row >
                <Col xs={24} sm={7}>
                    <Form.Item 
                        label='Password'
                        name='password'
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={7}>
                    <Form.Item 
                        label='New Password'
                        name='newPassword'
                        rules={[{
                            required: true,
                            message: 'new password is required'
                        }]}
                    >
                        <Input.Password /> 
                    </Form.Item>
                </Col>
                <Col xs={24} sm={7}>
                    <Form.Item 
                        label='Confirm'
                        name='confirm'
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: 'confirm your password!'
                            },
                            confirmValidator
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={3}>
                    <Form.Item>
                        <Button 
                            type='primary' 
                            htmlType='submit'
                            style={{ marginTop: '2em' }}
                        >
                            Change
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}