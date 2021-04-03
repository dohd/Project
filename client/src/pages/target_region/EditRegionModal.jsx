import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';

import Api from 'api';

export default function UpdateRegion(props) {
    const { fetchTargetRegions, record, visible, setVisible } = props;

    const onCreate = values => {
        setVisible(prev => ({...prev, update: false}));
        values.area = values.region;
        Api.targetRegion.patch(record.key, values)
        .then(res => fetchTargetRegions());
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
        if (record.hasOwnProperty('region')) {
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