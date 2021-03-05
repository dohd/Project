import React from 'react';
import { Form, Input, Select, Button, Space } from 'antd';

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 18 }};

export default function Tab2(props) {
    const {
        onNext, onBack, setState, 
        activityList, view, onSave
    } = props;

    const [formG] = Form.useForm();
    const onFinishG = values => {
        values.questionId = 7;
        setState(prev => {
            let exists = false;
            prev.formG.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formG: [...prev.formG, values]};
        });
        formG.resetFields();
        onSave();
    };
    const onFinishFailedG = err => console.log('Error:',err);

    const [formH] = Form.useForm();
    const onFinishH = values => {
        values.questionId = 8;
        setState(prev => {
            let exists = false;
            prev.formH.forEach(({response}) => {
                if (response === values.response) exists = true;
            });
            if (exists) return prev;
            return {...prev, formH: [...prev.formH, values]};
        });
        formH.resetFields();
        onSave();
    };
    const onFinishFailedH = err => console.log('Error:',err);

    return (
        <div>
            <Form
                {...layout}
                form={formG}
                onFinish={onFinishG}
                onFinishFailed={onFinishFailedG}
            >
                <Form.Item
                    label='d) List of publications used in the implementation'
                    labelAlign='left'
                    labelCol={{ span: 15 }}
                    colon={false}
                >
                    <Space>
                        <Button size='small' onClick={() => view('formG')}>
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
                form={formH}
                onFinish={onFinishH}
                onFinishFailed={onFinishFailedH}
            >
                <Form.Item
                    label='e) Future opportunity and emerging areas'
                    labelAlign='left'
                    labelCol={{ span: 15 }}
                    colon={false}
                >
                    <Space>
                        <Button size='small' onClick={() => view('formH')}>
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
