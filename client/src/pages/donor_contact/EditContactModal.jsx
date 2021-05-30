import React, { useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';

import Api from 'api';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

export default function EditContact(props) {
    const { 
        record, visible, setVisible, fetchDonorContacts,
        donors
    } = props;
    
    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(prev => ({...prev, update: false}));
        const [fName, lName] = values.contactName.split(' ');
        values.fName = fName;
        values.lName = lName;
        delete values.contact;

        Api.donorContact.patch(record.key, values)
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
        if (record.hasOwnProperty('key')) {
            const {fName, lName} = record; 
            form.setFieldsValue({
                donorId: record.donorId,
                contactName: `${fName} ${lName}`,
                telephone: record.telephone,
                email: record.email,
            });
        }
    }, [record, form]);

    const checkName = (rule, value) => {
        const regex = new RegExp(/^([a-zA-Z]{2,})\s([a-zA-Z]{2,})$/);
        if (!value) return Promise.reject('contact-name is required');
        if (!regex.test(value)) return Promise.reject('contact-name is invalid');
        return Promise.resolve();
    };

    const donorList = donors.map(v => (
        <Select.Option key={v.id} value={v.id}>
            {v.name}
        </Select.Option>
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
                    name='donorId'
                    rules={[{ 
                        required: true,
                        message: 'donor is required' 
                    }]}
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