import React from 'react';
import { Modal, Form, Button, DatePicker, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useTracked } from 'context';

export const dateFormat = 'YYYY-MM-DD';

export default function DateModalView(props) {
    const { visible, setVisible, onOk, form } = props;

    const store = useTracked()[0];
    const regionList = store.regions.map(({id, area}) => (
        <Select.Option key={id} value={id}>
            { area }
        </Select.Option>
    ));

    return (
        <div>
            <Button
                size='middle'
                onClick={() => setVisible(true)}
                icon={<PlusOutlined />}
                style={{ marginTop: '1.9em' }}
            />
            <Modal
                title='Event'
                visible={visible}
                onOk={onOk}
                okText='Add'
                onCancel={() => setVisible(false)}
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
