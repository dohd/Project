import React from 'react';
import { Form, Input, Select, Button, Space } from 'antd';

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 18 } };

export default function Tab2(props) {
    const {
        onNext, onBack, setState, 
        activityList, view, onSave
    } = props;

    const [formC] = Form.useForm();
    const onFinishC = values => {
        values.questionId = 3;
        setState(prev => {
            let exists = false;
            prev.formC.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formC: [...prev.formC, values]};            
        });
        formC.resetFields();
        onSave();
    };
    const onFinishFailedC = err => console.log('Error:',err);

    const [formD] = Form.useForm();
    const onFinishD = values => {
        values.questionId = 4;
        setState(prev => {
            let exists = false;
            prev.formD.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formD: [...prev.formD, values]};            
        });
        formD.resetFields();
        onSave();
    };
    const onFinishFailedD = err => console.log('Error:',err);

    return (
        <div>
            <Form
                {...layout}
                form={formC}
                onFinish={onFinishC}
                onFinishFailed={onFinishFailedC}
            >
                <Form.Item
                    label='b) (ii) Number of attained results'
                    labelAlign='left'
                    labelCol={{ span: 15 }}
                    colon={false}
                >
                    <Space>
                        <Button size='small' onClick={() => view('formC')}>
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
                form={formD}
                onFinish={onFinishD}
                onFinishFailed={onFinishFailedD}
            >
                <Form.Item
                    label='b) (iii) How has number of attained results affected the activity ?'
                    labelAlign='left'
                    labelCol={{ span: 15 }}
                    colon={false}
                >
                    <Space>
                        <Button size='small' onClick={() => view('formD')}>
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

            <div className='wrapper'>
                <Button
                    className='btn-back'
                    onClick={onBack}
                >
                    Back
                </Button>
                <Button
                    type='primary'
                    className='btn-next-2'
                    onClick={onNext}
                >
                    Next
                </Button>
            </div>
        </div>                  
    );
}
