import React, { useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';

import Api from 'api';
import { useTracked } from 'context';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

export default function EditContact(props) {
    const { record, visible, setVisible, fetchDonorContacts } = props;
    const store = useTracked()[0];
    
    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(prev => ({...prev, update: false}));
        Api.donor.patch(record.key, values)
        .then(res => {
            form.resetFields();
            fetchDonorContacts();
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
        if (record.hasOwnProperty('record')) {
            form.setFieldsValue({
                donor: record.donor,
                contactName: record.contactName,
                telephone: record.telephone,
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

    const donorList = store.donors.map(v => (
        <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>
    ));
    
    return (
        <Modal
            title='Edit Donor-contact'
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
                    label='Donor'
                    name='donor'
                    rules={[{ required: true }]}
                >
                    <Select>
                        { donorList }
                    </Select>
                </Form.Item>

                <Form.Item
                    label='Contact Name'
                    name='contactName'
                    rules={[{ required: true, validator: checkName }]}
                >
                    <Input placeholder='e.g John Doe' />
                </Form.Item>

                <Form.Item
                    label='Telephone'
                    name='telephone'
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