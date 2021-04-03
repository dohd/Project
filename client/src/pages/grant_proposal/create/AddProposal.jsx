import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Card, Form, Input, Button, Row, Col, DatePicker, 
    Select, InputNumber, Space 
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import ObjectiveModal from './ObjectiveModal';

export const dateFormat = 'YYYY-MM-DD';

export default function AddProposal(props) {
    const { 
        state, setState, form, 
        onFinish, onFinishFailed
    } = props;
    const history = useHistory();

    const objectiveList = state.objectives[0].map((val, i) => (
        <Select.Option key={i} value={val}>{ val }</Select.Option>
    ));

    const donorList = state.donors.map(({id, name}, i) => (
        <Select.Option key={i} value={id}>{ name }</Select.Option>
    ));
    
    return (
        <Card
            bordered={false}       
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()}
                        style={{fontSize: '18px'}} 
                    /> Create Proposal
                </Space>       
            }
        >
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}        
                initialValues={{ remember: true }}
            > 
                <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    label='Project Title'
                    name='title'
                    rules={[{ required: true }]}
                >
                    <Input maxLength={40} />
                </Form.Item>

                <Row>
                    <Col xs={24} sm={11} >
                        <Form.Item
                            labelCol={{ span: 4, offset: 5 }}
                            label='Period'
                            name='period'
                            rules={[{ required: true }]}
                        >
                            <DatePicker.RangePicker format={dateFormat} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={11}>
                        <Form.Item
                            labelCol={{ span: 8 }}
                            label='Date Submitted'
                            name='dateSubmitted'
                            rules={[{ 
                                required: true, 
                                message: 'submitted date is required' 
                            }]}
                        >
                            <DatePicker format={dateFormat} />                       
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    label='Donor'
                    name='donorId'
                    rules={[{ 
                        required: true,
                        message: 'donor is required'
                    }]}
                >
                    <Select placeholder='Select donor'>
                        { donorList }
                    </Select>
                </Form.Item>

                <Row>
                    <Col xs={24} sm={18}>
                        <Form.Item
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            label='Objectives'
                            name='objectives'
                            rules={[{ required: true }]}
                        >
                            <Select
                                mode='multiple'
                                showArrow={true}
                                placeholder='Add and select objectives'
                            >
                                { objectiveList }
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={2}>
                        <ObjectiveModal state={state} setState={setState} />
                    </Col>
                </Row>            

                <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 6 }}
                    label='Budget'
                    name='budget'
                    rules={[{ required: true }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 5, offset: 8 }}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        block
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}