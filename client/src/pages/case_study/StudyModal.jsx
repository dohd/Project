import React, { useEffect } from 'react'
import { Modal, Form, Input } from 'antd';

import Api from 'api';

export default function StudyModal(props) {
    const { 
        record, visible, setVisible, 
        fetchNarrative 
    } = props;

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(false);
        Api.caseStudy.patch(record.key, values)
        .then(res => {
            form.resetFields();
            fetchNarrative();
        });
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed:', err));
    };

    useEffect(() => {
        if (record.hasOwnProperty('caseStudy')) {
            form.setFieldsValue({
                caseStudy: record.caseStudy
            });
        }
    }, [record, form]);

    return (
        <Modal
            title='Case Study'
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
                    label='Case Study'
                    name='caseStudy'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}