import React from 'react';
import { Form, Input, Select, Button, Space } from 'antd';

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 18 } };

export default function Tab3(props) {
    const {
        onNext, onBack, setState, 
        activityList, view, onSave
    } = props;

    const [formE] = Form.useForm();
    const onFinishE = values => {
        values.questionId = 5;
        setState(prev => {
            let exists = false;
            prev.formE.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formE: [...prev.formE, values]};
        });
        formE.resetFields();
        onSave();
    };
    const onFinishFailedE = err => console.log('Error:',err);

    const [formF] = Form.useForm();
    const onFinishF = values => {
        values.questionId = 6;
        setState(state => {
            let exists = false;
            state.formF.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return state;
            return {...state, formF: [...state.formF, values]};
        });
        formF.resetFields();
        onSave();
    };
    const onFinishFailedF = err => console.log('Error:',err);

    return (
        <div>
            <Form
                {...layout}
                form={formE}
                onFinish={onFinishE}
                onFinishFailed={onFinishFailedE}
            >
                <Form.Item
                    label='b) (iv) Administrative and Logistical Challenges'
                    labelAlign='left'
                    labelCol={{ span: 15 }}
                    colon={false}
                >
                    <Space>
                        <Button size='small' onClick={() => view('formE')}>
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
                form={formF}
                onFinish={onFinishF}
                onFinishFailed={onFinishFailedF}
            >
                <Form.Item
                    label='c) What did you learn from the implementation ?'
                    labelAlign='left'
                    labelCol={{ span: 15 }}
                    colon={false}
                >
                    <Space>
                        <Button size='small' onClick={() => view('formF')}>
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
                    onClick={onBack}
                    className='btn-back'
                >
                    Back
                </Button>
                <Button
                    onClick={onNext}
                    type='primary'
                    className='btn-next-2'
                >
                    Next
                </Button>
            </div>
        </div>                  
    );
}
