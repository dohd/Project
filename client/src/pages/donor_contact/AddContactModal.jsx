import React from 'react';
import { Form, Input, Modal, message } from 'antd';
import Api from 'api';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

export default function AddContact(props) {
    const { fetchDonors, visible, setVisible } = props;

    const [form] = Form.useForm();
    const onCreate = values => {
        Api.donor.post(values)
        .then(res => {
            fetchDonors();
            form.resetFields();
        })
        .catch(err => {
            console.log(err);
            if (err.error) message.error(err.error.message);
        });
    };

    const onOk = () => {
        form.validateFields()
        .then(values => {
            setVisible(prev => ({...prev, create: false}));
            onCreate(values);
        })
        .catch(err => console.log('Validate Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, create: false}));

    const checkName = (rule, value) => {
        const regex = new RegExp(/^([a-zA-Z]{2,})\s([a-zA-Z]{2,})$/);
        if (!value) return Promise.reject('contact-name is required');
        if (regex.test(value)) return Promise.resolve();
        return Promise.reject('contact-name is invalid');
    };
    
    return (
        <Modal
            title='Add Donor Contact'
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form
                {...layout}
                form={form}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label='Donor'
                    name='donor'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Contact Name'
                    name='contact'
                    rules={[{ required: true, validator: checkName }]}
                >
                    <Input placeholder='e.g John Doe' />
                </Form.Item>
                <Form.Item
                    label='Phone'
                    name='phone'
                    rules={[{ required: true }]}
                >
                    <Input type='tel' maxLength={15} />
                </Form.Item>
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[{ required: true }]}
                >
                    <Input type='email' />
                </Form.Item>
            </Form>
        </Modal>
    );
}