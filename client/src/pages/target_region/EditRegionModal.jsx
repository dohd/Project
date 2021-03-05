import React, { useEffect } from 'react';
import { Form, Input, Modal, message } from 'antd';
import Api from 'api';

export default function UpdateRegion(props) {
    const { fetchRegions, record, visible, setVisible } = props;

    const onCreate = values => {
        setVisible(prev => ({...prev, update: false}));

        values.area = values.region;
        delete values.region;

        Api.targetRegion.patch(record.key, values)
        .then(res => fetchRegions())
        .catch(err => {
            console.log(err);
            if (err.error && err.error.status === 401) {
                return message.error(err.error.message);
            }
            message.error('Unknown error!');
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
            const { region } = record;
            form.setFieldsValue({ region });
        }
    }, [record, form]);
    
    return (
        <Modal
            title='Update Region'
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form
                form={form}
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