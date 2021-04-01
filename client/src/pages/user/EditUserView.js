import React from 'react';
import { Modal, Form, Radio, Input } from 'antd';

const layout = {labelCol: { span: 5 }, wrapperCol: { span: 16 }};

export default function EditUserView(props) {
    const {
        userRoles, visible, onCancel, onOk,
        form, checkName, checkInitial
    } = props;

    const rolesList = userRoles.map(({id, value}) => (
        <Radio key={id} value={id}>{ value }</Radio>
    ));

    return (
        <Modal
            title='Update User'
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form
                {...layout}
                form={form}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label='Username'
                    name='username'
                    rules={[{ 
                        required: true,
                        validator: checkName
                    }]}
                >
                   <Input placeholder='e.g John Doe' />
                </Form.Item>

                <Form.Item
                    label='Initial'
                    name='initial'
                    rules={[{ 
                        required: true,
                        validator: checkInitial
                    }]}
                >
                    <Input placeholder='e.g J.Doe' />
                </Form.Item>

                <Form.Item
                    label='Email'
                    name='email'
                    rules={[{ required: true }]}
                >
                    <Input type='email' />
                </Form.Item>

                <Form.Item
                    label='Role'
                    name='roleId'
                >
                    <Radio.Group>
                        { rolesList }
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    ); 
}