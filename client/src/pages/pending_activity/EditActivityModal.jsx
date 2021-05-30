import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

import Api from 'api';

export default function EditActivity(props) {
    const {record, visible, setVisible, fetchProposals} = props;

    const onCreate = values => {
        setVisible(prev => ({...prev, edit: false}));
        values.action = values.activity;
        
        Api.activity.patch(record.key, values)
        .then(res => fetchProposals())
    };
    
    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('validation Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, edit: false}));

    const [form] = Form.useForm();
    useEffect(() => {
        if (record.hasOwnProperty('activity')) {
            const { activity } = record;
            form.setFieldsValue({ activity });
        }
    }, [record, form]);

    return (
        <Modal
            title='Update Activity'
            visible={visible}
            onOk={onOk}           
            onCancel={onCancel}
            okText='Save'
        >
            <Form
                form={form}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    label='Activity'
                    name='activity'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}