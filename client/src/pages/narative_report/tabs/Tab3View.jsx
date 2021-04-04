import React from 'react'
import { Form, Input, Select, Button, Space } from 'antd';

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 18 } };

export default function Tab3View(props) {
    const {
        showModal, activityList, nextTab,
        prevTab, formE, onFinishE, onFinishFailedE,
        formF, onFinishF, onFinishFailedF
    } = props;
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
                        <Button size='small' onClick={() => showModal('formE')}>
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
                        <Button size='small' onClick={() => showModal('formF')}>
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