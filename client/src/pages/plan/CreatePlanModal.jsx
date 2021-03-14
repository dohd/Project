import React from 'react';
import { Modal, Form, Input, Select, Row, Col } from 'antd';

import DateModal from './DateModal';
import { useGroupContext, useProgrammeContext } from 'contexts';

export default function CreatePlan(props) {
    const { 
        visible, setVisible, state, setState, 
        form, onFinish, onFinishFailed
    } = props;

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
        <Modal
            title='Add Plan'
            visible={visible}
            onOk={() => setVisible(false)}
            okText='Add'
            onCancel={() => setVisible(false)}
        >
            <Form
                form = {form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout='vertical'
            >
                <Row>
                    <Col xs={24} sm={23}>
                        <Form.Item
                            label='Event Dates'
                            name='events'
                            rules={[{ 
                                required: true, 
                                message: 'event dates are required'
                            }]}
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
            </Form>
        </Modal>
    );
}