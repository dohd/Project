import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import Api from 'api';

export default function AddActivity(props) {
    const {objectiveId, visible, setVisible, fetchProposals} = props;

    const [form] = Form.useForm();
    const onCreate = values => {
        values.objectiveId = objectiveId;
        values.action = values.activity;
        delete values.activity;

        Api.activity.post(values)
        .then(res => {
            fetchProposals();
            form.resetFields();
        })
        .catch(err => { 
            console.log(err);
            message.error('Unknown error!');
        });
    };
            
    const onOk = () => {
        form.validateFields()
        .then(values => {
            setVisible(false);
            onCreate(values);
        })
        .catch(err => console.log('validation Failed:', err))
    };
    const onCancel = () => setVisible(false);

    return (
        <Modal
            title='Add Activity'
            visible={visible}
            onOk={onOk}           
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

    );
}