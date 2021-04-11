import React from 'react'
import { Form, Input, Select, Button, Space } from 'antd';

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 18 } };

export default function Tab6View(props) {
    const {
        showModal, activityList, prevTab,
        formJ, onFinishJ, onFinishFailedJ,
        formK, onFinishK, onFinishFailedK,
        setVisible
    } = props;
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
                        <Button size='small' onClick={() => showModal('formJ')}>
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
                        <Button size='small' onClick={() => showModal('formK')}>
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
                    onClick={prevTab}
                >
                    Back
                </Button>
                <Button
                    type='primary'
                    className='btn-next-2'
                    onClick={() => setVisible(true)}
                >
                    Submit
                </Button>
            </div>
        </div>                  
    );
}