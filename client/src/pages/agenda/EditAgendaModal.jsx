import React, { useEffect } from 'react';
import { Form, Modal, Input, TimePicker } from 'antd';
import moment from 'moment';
import Api from 'api';

const timeFormat = 'h:mm a';
const layout = { labelCol: { span: 5 }, wrapperCol: { span: 16 } };

export default function UpdateAgenda(props) {
    const { visible, setVisible, fetchAgenda, record } = props;
    const [form] = Form.useForm();
    // Form onSubmit
    const onCreate = values => {
        setVisible(prev => ({ ...prev, update: false }));
        const time = values.time.map(val => val.format(timeFormat));
        values.startTime = time[0];
        values.endTime = time[1];

        Api.agenda.patch(record.key, values)
        .then(res => fetchAgenda())
        .catch(err => console.log(err));

        form.resetFields();
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validation error',err));
    };
    const onCancel = () => setVisible(prev => ({...prev, update: false}));
    
    useEffect(() => {
        if (!!Object.keys(record).length) {
            form.setFieldsValue({
                task: record.task,
                assignee: record.assignee,
                designation: record.designation,
                time: record.time.map(val => moment(val, timeFormat))
            });
        }
    }, [record, form]);
    
    return (
        <Modal
            title='Update Agenda'
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
                    <TimePicker.RangePicker format={timeFormat} use12Hours />
                </Form.Item>

                <Form.Item
                    label='Task'
                    name='task'
                    rules={[{ required: true }]}
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
