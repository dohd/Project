import React from 'react';
import { Card, Form, Input, Button, Row, Col } from 'antd';

import Password from './Password';
import ChangeAvatar from './ChangeAvatar';

const layout = { wrapperCol: { span: 16 } };

export default function Settings(props) {
    const { form, onSave, restrict } = props;
    return (
        <Card
            title='Settings'
            extra={
                <Button 
                    type='primary' 
                    onClick={onSave}
                    disabled={restrict}
                >
                    Save
                </Button>
            }
        >
            <ChangeAvatar />

            <Form 
                {...layout}  
                form={form} 
                requiredMark={false}
            >
                <legend>Organisation</legend>
                <Form.Item 
                    label='Name'
                    name='orgName' 
                    labelCol={{ span: 3 }}
                    rules={[{ 
                        required: true,
                        message: 'name is required'
                    }]}
                >
                    <Input readOnly={restrict} />
                </Form.Item>
                <Row>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label='Telephone'
                            name='orgTelephone'
                            labelCol={{ offset: 1 }}
                            rules={[{ 
                                required: true,
                                message: 'telephone is required'
                            }]}
                        >
                            <Input type='tel' maxLength={15} readOnly={restrict} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label='Email'
                            name='orgEmail'
                            rules={[{ 
                                required: true,
                                message: 'email is required'
                            }]}
                        >
                            <Input type='email' readOnly={restrict} />
                        </Form.Item>
                    </Col>
                </Row>

                <legend>Contact Person</legend>
                <Row>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label='First Name'
                            name='fName'
                            labelCol={{ offset: 1 }}
                            rules={[{ 
                                required: true,
                                message: 'first name is required'
                            }]}
                        >
                            <Input readOnly={restrict} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label='Last Name' 
                            name='lName'
                            rules={[{ 
                                required: true,
                                message: 'last name is required'
                            }]}
                        >
                            <Input readOnly={restrict} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label='Telephone'
                            name='cpTelephone'
                            labelCol={{ offset: 1 }}
                            rules={[{ 
                                required: true,
                                message: 'telephone is required'
                            }]}
                        >
                            <Input type='tel' maxLength={15} readOnly={restrict} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label='Email'
                            name='cpEmail'
                            labelCol={{ span: 4 }}
                            rules={[{ 
                                required: true,
                                message: 'email is required'
                            }]}
                        >
                            <Input type='email' readOnly={restrict} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <Password />
        </Card>
    );
}