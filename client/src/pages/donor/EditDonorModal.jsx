import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';

import Api from 'api';

const layout = { labelCol: { span: 5 }, wrapperCol: { span: 16 } };

export default function EditDonor(props) {
    const { record, fetchDonors, visible, setVisible } = props;

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(prev => ({...prev, update: false}));
        Api.donor.patch(record.key, values)
        .then(res => {
            form.resetFields();
            fetchDonors();
        });
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, update: false}));

    // Initial form values
    useEffect(() => {
        if (record.hasOwnProperty('name')) {
            form.setFieldsValue({
                name: record.name,
                phone: record.phone,
                email: record.email,
            });    
        }
    }, [record, form]);
    
    return (
        <Modal
            title='Edit Donor'
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            okText='Save'
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