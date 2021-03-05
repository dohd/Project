import React from 'react';
import { Form, Input, Modal, message } from 'antd';
import Api from 'api';

export default function CreateRegion(props) {
    const { fetchRegions, visible, setVisible } = props;

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(prev => ({...prev, create: false}));

        values.area = values.region;
        delete values.region;

        Api.targetRegion.post(values)
        .then(res => {
            fetchRegions()
            form.resetFields();
        })
        .catch(err => {
            console.log(err);
            if (err.error && err.error.status === 401) {
                return message.error(err.error.message);
            }
            message.error('Unknown error!');
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
            title='Create Region'
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
                    label='Region'
                    name='region'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}