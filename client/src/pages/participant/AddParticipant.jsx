import React from 'react';
import { 
    Card, Form, Space, Input, DatePicker, 
    Button, Col, Row, Select 
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

export const dateFormat = 'YYYY-MM-DD';

export default function AddParticipant(props) {
    const { form, onFinish, onFinishFailed, state } = props;
    const history = useHistory();

    const checkName = (rule, value) => {
        const regex = new RegExp(/^([a-zA-Z]{2,})\s([a-zA-Z]{2,})$/);
        if (!value) return Promise.reject('name is required');
        if (regex.test(value)) return Promise.resolve();
        return Promise.reject('first and last name is required');
    };

    const genderList = state.gender.map(v => (
        <Select.Option key={v.id} value={v.id}>
            { v.type }
        </Select.Option>
    ));

    const regionList = state.regions.map(v => (
        <Select.Option key={v.id} value={v.id}>
            { v.area }
        </Select.Option>
    ));

    return (
        <Card 
            title={
                <Space>
                    <ArrowLeftOutlined
                        onClick={() => history.goBack()} 
                        style={{ fontSize: '18px' }} 
                    /> Create Participant
                </Space>       
            }
        >
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
                style={{ marginLeft: '5%' }}
            >
                <Row>
                    <Col xs={24} sm={11}>
                        <Form.Item
                            labelCol={{ span: 4, offset: 2 }}
                            label='Name'
                            name='name'
                            rules={[{
                                required: true, 
                                validator: checkName
                            }]}
                        >
                            <Input placeholder='e.g John Doe' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={11}>
                        <Form.Item
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 8 }}
                            label='Gender'
                            name='genderId'
                            rules={[{ 
                                required: true,
                                message: 'gender is required' 
                            }]}
                        >
                            <Select placeholder='Select gender'>
                                { genderList }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                
                <Form.Item
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 12 }}
                    label='Disability'
                    name='disability'
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 12 }}
                    label='Key Programme'
                    name='keyProgramme'
                >
                    <Input readOnly />
                </Form.Item>

                <Row>
                    <Col xs={24} sm={10}>
                        <Form.Item
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 14 }}
                            label='Phone'
                            name='phone'
                            rules={[{ required: true}]}
                        >
                            <Input type='tel' maxLength={15} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={11}>
                        <Form.Item
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            label='Email'
                            name='email'
                            rules={[{ required: true }]}
                        >
                            <Input type='email' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={10}>
                        <Form.Item
                            labelCol={{ span: 7 }}
                            label='Designation'
                            name='designation'
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={11}>
                        <Form.Item
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 14 }}
                            label='Region'
                            name='regionId'
                            rules={[{ 
                                required: true,
                                message: 'region is required' 
                            }]}
                        >
                            <Select placeholder='Select region'>
                                { regionList }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    labelCol={{ span: 3 }}
                    label='Activity Date'
                    name='activityDate'
                    rules={[{ required: true }]}
                >
                    <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 6, offset: 7 }}>
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