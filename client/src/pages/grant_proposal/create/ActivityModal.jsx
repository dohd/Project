import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function ActivityModal({ activities, setActivities }) {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const onCancel = () => setVisible(false);

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(false);
        const { activity } = values;
        const exist = activities.includes(activity);
        if (!exist) setActivities(prev => [...prev, activity]);
        form.resetFields();
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validation error:',err));
    };

    return (
        <div>
            <Button
                size='middle'
                onClick={showModal}
                icon={<PlusOutlined />}
            />

            <Modal
                title='Add Activity'
                visible={visible}
                onOk={onOk}
                okText='Add'
                onCancel={onCancel}
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
        </div>
    );
}