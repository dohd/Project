import React from 'react';
import { Form, Input, Modal } from 'antd';
import Api from 'api';

export default function AddProgramme(props) {
    const { fetchKeyProgrammes, visible, setVisible } = props;

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(prev => ({...prev, create: false}));
        Api.keyProgramme.post(values)
        .then(res => {
            form.resetFields();
            fetchKeyProgrammes();
        });
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, create: false}));
    
    return (
        <Modal
            title='Add Programme'
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            okText='Save'
        >
            <Form
                form={form}
                initialValues={{ remember: true }}
                layout='vertical'
            >
                <Form.Item
                    labelCol={{ span: 6 }}
                    label='Programme'
                    name='programme'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}