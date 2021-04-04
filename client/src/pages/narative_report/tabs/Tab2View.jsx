import React from 'react';
import { Form, Input, Select, Button, Space } from 'antd';

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 18 } };

export default function Tab2View(props) {
    const {
        showModal, activityList, prevTab, 
        nextTab, formC, onFinishC, onFinishFailedC,
        formD, onFinishD, onFinishFailedD
    } = props;
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
                        <Button size='small' onClick={() => showModal('formC')}>
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
                        <Button size='small' onClick={() => showModal('formD')}>
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
                    onClick={nextTab}
                >
                    Next
                </Button>
            </div>
        </div>                  
    );
}