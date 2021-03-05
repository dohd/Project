import React from 'react';
import { Form, Input, Select, Button, Space } from 'antd';

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 18 } };

export default function Tab6(props) {
    const {
        onBack, onSubmit, setState, 
        activityList, view, onSave
    } = props;

    const [formJ] = Form.useForm();
    const onFinishJ = values => {
        values.questionId = 9;        
        setState(state => {
            let exists = false;
            state.formJ.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return state;
            return {...state, formJ: [...state.formJ, values]};            
        });
        formJ.resetFields();
        onSave();
    };
    const onFinishFailedJ = err => console.log('Error:',err);

    const [formK] = Form.useForm();
    const onFinishK = values => {
        values.questionId = 10;
        setState(prev => {
            let exists = false;
            prev.formK.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formK: [...prev.formK, values]};            
        });
        formK.resetFields();
        onSave();
    };
    const onFinishFailedK = err => console.log('Error:',err);

    return (
        <div>
            <Form
                {...layout}
                form={formJ}
                onFinish={onFinishJ}
                onFinishFailed={onFinishFailedJ}
            >
                <Form.Item
                    label='h) Activity Lasting Impact'
                    labelAlign='left'
                    labelCol={{ span: 15 }}
                    colon={false}
                >
                    <Space>
                        <Button size='small' onClick={() => view('formJ')}>
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
                form={formK}
                onFinish={onFinishK}
                onFinishFailed={onFinishFailedK}
            >
                <Form.Item
                    label='i) Future plans to continue working on the activity'
                    labelAlign='left'
                    labelCol={{ span: 15 }}
                    colon={false}
                >
                    <Space>
                        <Button size='small' onClick={() => view('formK')}>
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
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </div>
        </div>                  
    );
}
