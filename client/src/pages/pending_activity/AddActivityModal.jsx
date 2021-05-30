import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Form, Input } from 'antd';

import Api from 'api';

export default function AddActivity(props) {
    const {visible, setVisible, fetchProposals} = props;
    const { objectiveId } = useParams();

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(prev => ({...prev, add: false}));
        values.action = values.activity;
        values.objectiveId = objectiveId;

        Api.activity.post(values)
        .then(res => {
            form.resetFields();
            fetchProposals();
        });
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('validation Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, add: false}));

    return (
        <Modal
            title='Add Activity'
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