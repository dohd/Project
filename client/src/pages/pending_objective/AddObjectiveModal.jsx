import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Form, Input } from 'antd';

import Api from 'api';

export default function AddObjective(props) {
    const {visible, setVisible, fetchProposals} = props;
    const { proposalId } = useParams();

    const [form] = Form.useForm();
    const onCreate = values => { 
        setVisible(prev => ({...prev, add: false}));
        values.proposalId = proposalId;

        Api.objective.post(values)
        .then(res => {
            form.resetFields();
            fetchProposals();
        });
    };
    
    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validation Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, add: false}));

    return (
        <Modal
            title='Add Objective'
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