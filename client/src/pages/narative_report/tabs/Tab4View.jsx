import React from 'react';
import { Form, Input, Select, Button, Space } from 'antd';

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 18 }};

export default function Tab4View(props) {
    const {
        showModal, activityList, prevTab,
        nextTab, formG, onFinishG, onFinishFailedG,
        formH, onFinishH, onFinishFailedH
    } = props;
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
                        <Button size='small' onClick={() => showModal('formG')}>
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
                        <Button size='small' onClick={() => showModal('formH')}>
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
                    onClick={prevTab}
                    className='btn-back'
                >
                    Back
                </Button>
                <Button
                    onClick={nextTab}
                    type='primary'
                    className='btn-next-2'
                >
                    Next
                </Button>
            </div>
        </div>                  
    ); 
}