import React, { useEffect } from 'react';
import { Form, Input, Modal, message } from 'antd';
import Api from 'api';

export default function EditProgramme(props) {
    const { fetchProgrammes, record, visible, setVisible } = props;
    const onCreate = values => {
        setVisible(prev => ({...prev, update: false}));
        Api.keyProgramme.patch(record.key, values)
        .then(res => fetchProgrammes())
        .catch(err => {
            console.log(err);
            if (err.error) message.error(err.error.message);
        });
    };

    const [form] = Form.useForm();
    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, update: false}));

    // Initial form values
    useEffect(() => {
        if (Object.keys(record).length) {
            const { programme } = record;
            form.setFieldsValue({ programme });
        }
    }, [record, form]);
    
    return (
        <Modal
            title='Update Programme'
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form
                form={form}
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