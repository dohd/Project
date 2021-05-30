import React from 'react';
import { Modal, Form, Input, Select, Row, Col } from 'antd';

import DateModal from './DateModal';

export default function CreatePlan(props) {
    const { 
        visible, setVisible, state, setState, 
        form, onOk, keyProgrammes, targetGroups, 
        targetRegions
    } = props;

    const dateList = state.events[0].map((val, i) => (
        <Select.Option key={i} value={val}>
            { val }
        </Select.Option>
    ));

    const groupList = targetGroups.map(({id, group}) => (
        <Select.Option key={id} value={id}>
            { group }
        </Select.Option>
    ));

    const programmeList = keyProgrammes.map(({id, programme}) => (
        <Select.Option key={id} value={id}>
            { programme }
        </Select.Option>
    ));

    return (
        <Modal
            title='Add Plan'
            visible={visible}
            onOk={onOk}
            onCancel={() => setVisible(false)}
            okText='Save'
        >
            <Form
                form = {form}
                initialValues={{ remember: true }}
                layout='vertical'
            >   
                <Form.Item
                    label='Plan Title'
                    name='title'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
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
                        <DateModal 
                            state={state} 
                            setState={setState} 
                            regions={targetRegions}
                        />
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