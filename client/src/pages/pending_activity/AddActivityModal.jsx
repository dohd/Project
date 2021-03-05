import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import Api from 'api';

export default function AddActivity(props) {
    const {visible, setVisible, fetchProposals, objectiveId} = props;

    const onCreate = values => {
        setVisible(prev => ({...prev, add: false}));
        values.objectiveId = objectiveId;
        Api.activity.post(values)
        .then(res => fetchProposals())
        .catch(err => { 
            console.log(err);
            if (err.error) message.error(err.error.message);
        });
    };

    const [form] = Form.useForm();
    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('validation Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, add: false}));

    return (
        <Modal
            title='Add Activity'
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
                    label='Activity'
                    name='action'
                    rules={[{ 
                        required: true, 
                        message: 'activity is required' 
                    }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}