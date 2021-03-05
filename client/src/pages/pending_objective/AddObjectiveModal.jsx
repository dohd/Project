import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import Api from 'api';

export default function AddObjective(props) {
    const {visible, setVisible, fetchProposals, proposalId} = props;

    const onCreate = values => { 
        setVisible(prev => ({...prev, add: false}));
        values.proposalId = proposalId;
        Api.objective.post(values)
        .then(res => fetchProposals())
        .catch(err => {
            console.log(err);
            if (err.error) message.error(err.error.message);
        });
    };
    
    const [form] = Form.useForm();
    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('validation Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, add: false}));

    return (
        <Modal
            title='Add Objective'
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
                    label='Objective'
                    name='objective'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}