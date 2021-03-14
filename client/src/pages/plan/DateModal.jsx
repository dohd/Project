import React, { useState,  } from 'react';
import { Modal, Form, Button, DatePicker, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRegionContext } from 'contexts';

const dateFormat = 'YYYY-MM-DD';

export default function DateModal({ state, setState }) {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const onCancel = () => setVisible(false);

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(false);
        const date = values.date.format(dateFormat);
        const exists = state.events[0].includes(date);
        if (exists) return form.resetFields();
        setState(prev => ({
            events: [
                [...prev.events[0], date],
                [...prev.events[1], values.regions]
            ]
        }));
        form.resetFields();       
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('validation Failed:', err));
    };

    const { regions } = useRegionContext();
    const regionList = regions.map(({id, area}) => (
        <Select.Option key={id} value={id}>
            { area }
        </Select.Option>
    ));

    return (
        <div>
            <Button
                size='middle'
                onClick={showModal}
                icon={<PlusOutlined />}
                style={{ marginTop: '1.9em' }}
            />

            <Modal
                title='Event'
                visible={visible}
                onOk={onOk}
                okText='Add'
                onCancel={onCancel}
            >
                <Form
                    form={form}
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        label='Implementation Date'
                        name='date'
                        rules={[{ required: true }]}
                    >
                        <DatePicker format={dateFormat} />
                    </Form.Item>
                    <Form.Item 
                        label='Regions' 
                        name='regions'
                        rules={[{ required: true }]}
                    >
                        <Select 
                            mode='multiple' 
                            placeholder='select event regions'
                            showArrow
                        >
                            { regionList }
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
