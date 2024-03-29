import React from 'react';
import { Form, Modal, Input, TimePicker } from 'antd';
import Api from 'api';

const timeFormat = 'h:mm a';

const layout = { labelCol: { span: 5 }, wrapperCol: { span: 16 } };

export default function CreateAgenda(props) {
    const { visible, setVisible, fetchAgenda } = props;
    const [form] = Form.useForm();

    const onCreate = values => {
        setVisible(prev => ({...prev, create: false}));
        const time = values.time.map(val => val.format(timeFormat));
        values.startTime = time[0];
        values.endTime = time[1];

        Api.agenda.post(values)
        .then(res => fetchAgenda())
        .catch(err => console.log(err));

        form.resetFields();
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed:',err));
    };
    const onCancel = () => setVisible(prev => ({...prev, create: false}));

    return (
        <Modal
            title='Create Agenda'
            visible={visible}
            onOk={onOk}
            okText='Save'           
            onCancel={onCancel}
        >
            <Form
                {...layout}
                form={form}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label='Time'
                    name='time'
                    rules={[{ required: true }]}
                >
                    <TimePicker.RangePicker 
                        format={timeFormat} 
                        use12Hours 
                    />
                </Form.Item>

                <Form.Item
                    label='Task'
                    name='task'
                    rules={[{ required: true  }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Assignee'
                    name='assignee'
                    rules={[{ 
                        required: true, 
                        message: 'assignee (responsible person) is required' 
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Designation'
                    name='designation'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>        
    );
}
