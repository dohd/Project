import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import Api from 'api';

export default function EditActivity(props) {
    const {record, visible, setVisible, fetchProposals} = props;

    const onCreate = values => {
        setVisible(prev => ({...prev, edit: false}));
        Api.activity.patch(record.key, values)
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
            const { action } = record;
            form.setFieldsValue({ action });
        }
    }, [record, form]);

    return (
        <Modal
            title='Update Activity'
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
                    name='action'
                    rules={[{ 
                        required: true, 
                        message: 'activity is required' 
                    }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}