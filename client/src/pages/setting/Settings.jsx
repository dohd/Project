import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Row, Col, message } from 'antd';
import jwt_decode from 'jwt-decode';
import Password from './Password';
import ChangeAvatar from './ChangeAvatar';
import Api from 'api';
import { useOrgProfileContext } from 'contexts';

const layout = { wrapperCol: { span: 16 } };

export default function Settings() {
    const { orgProfile, fetchOrgProfile } = useOrgProfileContext();

    const [state, setState] = useState(true);
    useEffect(() => {
        const payload = jwt_decode(sessionStorage.getItem('token'));
        if (payload.roleId === 1) setState(false);
    }, []);

    const onCreate = values => {
        Api.orgProfile.post(values)
        .then(res => {
            fetchOrgProfile();
            message.success('Settings updated successfully');
        })
        .catch(err => {
            console.log(err);
            message.error('Unknown error!');
        });
    };

    const [form] = Form.useForm();
    const onSave = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed',err));
    };

    useEffect(() => {
        if (Object.keys(orgProfile).length) {
            const { detail, person } = orgProfile;
            form.setFieldsValue({
                orgName: detail.name,
                orgEmail: detail.email,
                orgTelephone: detail.telephone,
                cpTelephone: person.telephone,
                cpEmail: person.email,
                firstName: person.firstName,
                lastName: person.lastName
            });
        }
    }, [form, orgProfile]);

    return (
        <Card
            title='Settings'
            extra={
                <Button 
                    type='primary' 
                    onClick={onSave}
                    disabled={state}
                >
                    Save
                </Button>
            }
        >
            <ChangeAvatar />

            <Form {...layout}  form={form} requiredMark={false}>
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
                    <Input readOnly={state} />
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
                            <Input type='tel' maxLength={15} readOnly={state} />
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
                            <Input type='email' readOnly={state} />
                        </Form.Item>
                    </Col>
                </Row>

                <legend>Contact Person</legend>
                <Row>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label='First Name'
                            name='firstName'
                            labelCol={{ offset: 1 }}
                            rules={[{ 
                                required: true,
                                message: 'first name is required'
                            }]}
                        >
                            <Input readOnly={state} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label='Last Name' 
                            name='lastName'
                            rules={[{ 
                                required: true,
                                message: 'last name is required'
                            }]}
                        >
                            <Input readOnly={state} />
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
                            <Input type='tel' maxLength={15} readOnly={state} />
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
                            <Input type='email' readOnly={state} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            
            <Password />
        </Card>
    );
}