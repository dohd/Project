import React from 'react';
import { Form, Input, Modal, Radio } from 'antd';

const layout = {labelCol: { span: 5 }, wrapperCol: { span: 16 }};

export default function AddUserView(props) {
    const {
        form, visible, onOk, onCancel,
        checkName, checkInitial, userRoles
    } = props;

    const rolesList = userRoles.map(({id, value}) => (
        <Radio key={id} value={id}>{ value }</Radio>
    ));

    return (
        <Modal
            title='Create User'
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            destroyOnClose
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
                    rules={[{ 
                        required: true,
                        message: 'role is required'
                    }]}
                >
                    <Radio.Group>
                        { rolesList }
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
}