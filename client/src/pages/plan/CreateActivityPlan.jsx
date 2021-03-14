import React, { useState,  } from 'react';
import { Card, Form, Space, Input, Select, Button, Row, Col, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Api from 'api';
import DateModal from './DateModal';
import { useGroupContext, useProgrammeContext, useActivityPlanContext } from 'contexts';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 16 } };

export default function CreateActivityPlan({ match, history }) {
    const { activityId } = match.params;    
    const [state, setState] = useState({ events: [ [],[] ] });

    const { fetchActivityPlans } = useActivityPlanContext();
    const [form] = Form.useForm();
    const onFinish = values => {
        values.activityId = activityId;
        values.events = state.events[0].map((val, i) => ({
            date: val, regions: [...state.events[1][i]]
        }));
        values.programmeId = values.programme;
        delete values.programme;

        Api.activityPlan.post(values)
        .then(res => {
            form.resetFields();
            message.success('Form submitted successfully');
            fetchActivityPlans();
        })
        .catch(err => {
            console.log(err);
            message.error('Unknown error!');
        });
    };
    const onFinishFailed = err => console.log('Error:',err);

    const dateList = state.events[0].map((val, i) => (
        <Select.Option key={i} value={val}>{ val }</Select.Option>
    ));

    const { targetGroups } = useGroupContext();
    const groupList = targetGroups.map(({id, group}) => (
        <Select.Option key={id} value={id}>{ group }</Select.Option>
    ));

    const { programmes } = useProgrammeContext();
    const programmeList = programmes.map(({id, programme}) => (
        <Select.Option key={id} value={id}>{ programme }</Select.Option>
    ));

    return (
        <Card 
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()}
                        style={{fontSize: '18px'}} 
                    />                       
                    Create Activity Plan
                </Space>       
            }
        >
            <Form
                {...layout}
                form = {form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} sm={19}>
                        <Form.Item
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 20 }}
                            label='Event dates'
                            name='events'
                            rules={[{ required: true }]}
                        >
                            <Select 
                                mode='multiple' 
                                placeholder='Add and select event dates'
                                showArrow
                            >                            
                                { dateList }
                            </Select>
                        </Form.Item>         
                    </Col>
                    <Col xs={24} sm={1}>
                        <DateModal state={state} setState={setState} />
                    </Col>
                </Row>

                <Form.Item 
                    label='Target Groups' 
                    name='groups'
                    rules={[{ 
                        required: true,
                        message: 'target groups are required'
                    }]} 
                >
                    <Select 
                        mode='multiple' 
                        placeholder='Select Target groups'
                        showArrow
                    >
                        { groupList }
                    </Select>
                </Form.Item>

                <Form.Item 
                    label='Key Programme' 
                    name='programme'
                    rules={[{ required: true }]}
                >
                    <Select placeholder='Select Key programme'>
                        { programmeList }
                    </Select>
                </Form.Item>

                <Form.Item label='Materials' name='material' >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 5, offset: 8 }}>
                    <Button type='primary' htmlType='submit' block>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}