import React from 'react';
import { Form, Input, Modal, message } from 'antd';
import Api from 'api';

const layout = { labelCol: { span: 5 }, wrapperCol: { span: 16 } };

export default function AddDonor(props) {
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
    
    return (
        <Modal
            title='Create Donor'
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
                    label='Name'
                    name='name'
                    rules={[{ required: true }]}
                >
                    <Input />
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