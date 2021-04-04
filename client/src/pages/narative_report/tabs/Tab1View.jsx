import React from 'react';
import { Form, Input, Select, Button, Space } from 'antd';

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 18 } };

export default function Tab1View(props) {
    const {
        formA, onFinishA, onFinishFailedA, 
        showModal, activityList, formB, onFinishB,
        onFinishFailedB, nextTab
    } = props;
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
                        <Button size='small' onClick={() => showModal('formA')}>
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
                        <Button size='small' onClick={() => showModal('formB')}>
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
                        onClick={nextTab}
                        block
                    >
                        Next
                    </Button>
                </Form.Item>
            </Form>
        </div>                  
    );
}