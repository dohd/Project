import React, { useEffect } from 'react';
import { Form, Input, Modal, message } from 'antd';
import Api from 'api';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

export default function EditContact(props) {
    const { record, fetchDonorContacts, visible, setVisible } = props;

    const [form] = Form.useForm();
    const onCreate = values => {
        Api.donor.patch(record.key, values)
        .then(res => {
            fetchDonorContacts();
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
            setVisible(prev => ({...prev, update: false}));
            onCreate(values);
        })
        .catch(err => console.log('Validate Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, update: false}));

    // Initial form values
    useEffect(() => {
        if (Object.keys(record).length) {
            form.setFieldsValue({
                donor: record.donor,
                contactName: record.contactName,
                phone: record.phone,
                email: record.email,
            });    
        }
    }, [record, form]);

    const checkName = (rule, value) => {
        const regex = new RegExp(/^([a-zA-Z]{2,})\s([a-zA-Z]{2,})$/);
        if (!value) return Promise.reject('contact-name is required');
        if (regex.test(value)) return Promise.resolve();
        return Promise.reject('contact-name is invalid');
    };
    
    return (
        <Modal
            title='Edit Donor-contact'
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
                    name='contactName'
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