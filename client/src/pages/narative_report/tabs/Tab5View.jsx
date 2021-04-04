import React from 'react'
import { Form, Input, Button } from 'antd';

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 18 } };

export default function Tab5View(props) {
    const {
        form, onFinish, onFinishFailed,
        prevTab
    } = props;
    return (
        <div>
            <Form
                {...layout}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
            >
                <Form.Item 
                    label='f) Case Study' 
                    name='study'
                    required
                    rules={[{
                        required: true, 
                        message: 'Case Study is required',
                    }]}
                >
                    <Input.TextArea style={{ height: '8em' }} />
                </Form.Item>
                
                <div className='wrapper'>
                    <Button
                        onClick={prevTab}
                        className='btn-back'
                    >
                        Back
                    </Button>
                    <Button
                        type='primary'
                        className='btn-next-2'
                        htmlType='submit'
                    >
                        Next
                    </Button>
                </div>
            </Form>
        </div>                  
    );
}