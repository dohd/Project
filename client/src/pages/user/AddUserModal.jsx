import React from 'react';
import { Form, Input, Modal, Radio, message } from 'antd';
import Api from 'api';

const layout = {labelCol: { span: 5 }, wrapperCol: { span: 16 }};

export default function CreateUser(props) {
    const { 
        fetchUsers, visible, setVisible, 
        userRoles 
    } = props;

    const rolesList = userRoles.map(({id, value}) => (
        <Radio key={id} value={id}>{ value }</Radio>
    ));

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(prev => ({...prev, create: false}));
        Api.user.post(values)
        .then(res => {
            fetchUsers();
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
    
    const checkName = (rule, value) => {
        const regex = new RegExp(/^([a-zA-Z]{2,})\s([a-zA-Z]{2,})$/);
        if (!value) return Promise.reject('username is required');
        if (regex.test(value)) return Promise.resolve();
        return Promise.reject('username is invalid');
    };

    const checkInitial = (rule, value) => {
        const regex = new RegExp(/^([a-zA-Z])\.([a-zA-Z]{2,})$/)
        if (!value) return Promise.reject('initial is required');
        if (regex.test(value)) return Promise.resolve();
        return Promise.reject('initial is invalid');
    };

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