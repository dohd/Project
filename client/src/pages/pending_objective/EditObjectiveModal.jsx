import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import Api from 'api';

export default function EditObjective(props) {
    const {record, visible, setVisible, fetchProposals} = props;

    const onCreate = values => { 
        setVisible(prev => ({...prev, edit: false}));
        Api.objective.patch(record.key, values)
        .then(res => fetchProposals())
        .catch(err => {
            console.log(err);
            if (err.error) message.error(err.error.message);
        });
    };
    
    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('validation Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, edit: false}));

    const [form] = Form.useForm();
    useEffect(() => {
        if (Object.keys(record).length) {
            const { objective } = record;
            form.setFieldsValue({ objective });
        }
    }, [form, record]);

    return (
        <Modal
            title='Update Objective'
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