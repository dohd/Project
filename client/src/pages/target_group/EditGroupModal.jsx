import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';

import Api from 'api';

export default function UpdateGroup(props) {
    const { fetchTargetGroups, record, visible, setVisible } = props;

    const onCreate = values => {
        setVisible(prev => ({...prev, update: false}));
        Api.targetGroup.patch(record.key, values)
        .then(res => fetchTargetGroups());
    };

    const [form] = Form.useForm();
    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, update: false}));

    // Initial form values
    useEffect(() => {
        if (record.hasOwnProperty('group')) {
            const { group } = record;
            form.setFieldsValue({ group });
        }
    }, [record, form]);
    
    return (
        <Modal
            title='Update Target Group'
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            okText='Save'
        >
            <Form
                form={form}
            >
                <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    label='Group'
                    name='group'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}