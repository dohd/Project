import React from 'react';
import { Form, Input, Select, Button, Space } from 'antd';

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 18 } };

export default function Tab1(props) {
    const {
        onNext, setState, activityList, 
        view, onSave
    } = props;

    const [formA] = Form.useForm();
    const onFinishA = values => {
        values.questionId = 1;
        setState(prev => {
            let exists = false;
            prev.formA.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formA: [...prev.formA, values]};            
        });
        formA.resetFields();   
        onSave();
    };
    const onFinishFailedA = err => console.log('Error:',err);

    const [formB] = Form.useForm();
    const onFinishB = values => {
        values.questionId = 2;
        setState(prev => {
            let exists = false;
            prev.formB.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formB: [...prev.formB, values]};
        });
        formB.resetFields();
        onSave();
    };
    const onFinishFailedB = err => console.log('Error:',err);

    return (
        <div>  
            <Form 
                {...layout}
                form={formA}
                onFinish={onFinishA}
                onFinishFailed={onFinishFailedA}
            >
                <Form.Item
                    label='a) Deviation from original plan'
                    labelAlign='left'
                    labelCol={{ span: 15 }}
                    colon={false}
                >
                    <Space>
                        <Button size='small' onClick={() => view('formA')}>
                            View
                        </Button>
                        <Button type='primary' size='small' htmlType='submit'>
                            Save
                        </Button>
                    </Space>                    
                </Form.Item>

                <Form.Item name='agendaId'>
                    <Select placeholder='Select an activity'>
                        { activityList }
                    </Select>
                </Form.Item>
                <Form.Item name='response'>  
                    <Input.TextArea />
                </Form.Item>
            </Form>
            
            <Form 
                {...layout}
                form={formB}
                onFinish={onFinishB}
                onFinishFailed={onFinishFailedB}
            >
                <Form.Item
                    label='b) (i) Results attained'
                    labelAlign='left'
                    labelCol={{ span: 15 }}
                    colon={false}
                >
                    <Space>
                        <Button size='small' onClick={() => view('formB')}>
                            View
                        </Button>
                        <Button type='primary' size='small' htmlType='submit'>
                            Save
                        </Button>
                    </Space>                    
                </Form.Item>                
                <Form.Item name='agendaId'>
                    <Select placeholder='Select an activity' >
                        { activityList }
                    </Select>
                </Form.Item>
                <Form.Item name='response'>         
                    <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 5, offset: 6 }}>
                    <Button
                        type='primary'
                        onClick={onNext}
                        block
                    >
                        Next
                    </Button>
                </Form.Item>
            </Form>
        </div>                  
    );
}