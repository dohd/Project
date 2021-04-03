import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import ActivityModal from './ActivityModal';

export default function ObjectiveModal({ state, setState }) {
    const [visible, setVisible] = useState(false);

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(false);
        const { objective, activities } = values;
        const exist = state.objectives[0].includes(objective);
        if (!exist) setState(prev => ({
            ...prev, 
            objectives: [
                [...prev.objectives[0], objective], 
                [...prev.objectives[1], activities]
            ]
        }));
        form.resetFields();
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validation error:',err));
    };
    const onCancel = () => setVisible(false);

    const [activities, setActivities] = useState([]);
    const showModal = () => {
        setVisible(true);
        setActivities([]);
    };

    const activityList = activities.map((val, i) => (
        <Select.Option key={i} value={val}>{ val }</Select.Option>
    ));
    
    return (
        <div>  
            <Button
                size='middle'
                onClick={showModal}
                icon={<PlusOutlined />}
            />

            <Modal
                title={`Objective & Activities`}
                visible={visible}
                onOk={onOk}
                okText='Add'
                onCancel={onCancel}
            >
                <Form
                    form={form}
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        label='Objective'
                        name='objective'
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Row>
                        <Col xs={24} sm={20}>
                            <Form.Item
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 20 }}
                                label='Activities'
                                name='activities'
                                rules={[{ required: true }]}
                            >
                                <Select
                                    mode='multiple'
                                    showArrow={true}
                                    placeholder='Add and select activities'
                                >
                                    { activityList }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={2}>
                            <ActivityModal
                                activities={activities}
                                setActivities={setActivities}
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
}