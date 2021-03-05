import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 18 } };

export default function Tab5(props) {
    const {onNext, onBack, state, setState} = props;

    const [form] = Form.useForm();
    const onFinish = values => {
        const { study } = values;
        setState(prev => {
            if (!study) return prev;
            return {...prev, formI: {...prev.formI, study}};
        });
        onNext();
    };
    const onFinishFailed = err => console.log('Error:', err);

    useEffect(() => {
        const { study } = state.formI;
        if (study) form.setFieldsValue({ study });
    }, [state, form]);

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
                        onClick={onBack}
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
