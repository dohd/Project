import React from 'react'
import { Modal, Form, Input } from 'antd';

export default function TitleModal(props) {
    const { visible, setVisible, onOk, form } = props;
    return (
        <Modal
            title='Narrative Report Title'
            visible={visible}
            okText='Save'
            onOk={onOk}
            onCancel={() => setVisible(false)}
        >
            <Form
                form={form}
                initialValues={{ remember: true }}
                layout='vertical'
            >
                <Form.Item
                    label='Title'
                    name='title'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}
