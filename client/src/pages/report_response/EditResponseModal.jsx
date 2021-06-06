import React, { useEffect } from 'react'
import { Modal, Form, Input } from 'antd';

import Api from 'api';

export default function EditResponseModal(props) {
    const { 
        record, visible, setVisible, 
        fetchNarratives
    } = props;

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(false);
        console.log(values);
        Api.narrativeResponse.patch(record.key, values)
        .then(res => {
            form.resetFields();
            fetchNarratives();
        });
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed:', err));
    };

    useEffect(() => {
        if (record.hasOwnProperty('response')) {
            form.setFieldsValue({
                response: record.response
            });
        }
    }, [record, form]);

    return (
        <Modal
            title='Response'
            visible={visible}
            onOk={onOk}
            okText='Save'
            onCancel={() => setVisible(false)}
        >
            <Form
                form={form}
                initialValues={{ remember: true }}
            >   
                <Form.Item 
                    label='Response'
                    name='response'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}