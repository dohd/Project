import React from 'react';
import { 
    Card, Form, Space, Input, DatePicker, 
    Button, Col, Row, Select 
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

export const dateFormat = 'YYYY-MM-DD';

export default function EditParticipant(props) {
    const { form, onFinish, onFinishFailed, state } = props;
    const history = useHistory();

    const checkName = (rule, value) => {
        const names = value.split(' ').filter(val => val);
        if (names.length < 2) return Promise.reject('first & last name is required');
        return Promise.resolve();
    };

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
                    /> Update Participant
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
                            <Input placeholder='first & last name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={11}>
                        <Form.Item
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 8 }}
                            label='Gender'
                            name='gender'
                        >
                            <Select placeholder='Select gender'>
                                <Select.Option value='M'>Male</Select.Option>
                                <Select.Option value='F'>Female</Select.Option>
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