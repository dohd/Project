import React from 'react';
import { Card, Row, Col, Select, Space, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { tabContent } from './Tabs';
import ViewModal from './ViewModal';

export default function Narrative(props) {
    const {
        agendaActivities, visible, 
        setVisible, record, tab, onTabChange
    } = props;
    const history = useHistory();

    const onSave = () => message.success('Data saved');

    const activityList = agendaActivities.map(({id, activity}) => (
        <Select.Option key={id} value={id}>{ activity }</Select.Option>
    ));

    const params = { ...props, activityList, onSave };

    return (
        <Card 
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined 
                      onClick={() => history.goBack()}
                      style={{fontSize: '18px'}}
                    /> Activity Narrative Report
                </Space>
            }
            activeTabKey={tab.key}
            onTabChange={onTabChange}
        >
            <Row>
                <Col span={23} offset={2}>
                    { tabContent(params)[tab.key] }
                </Col>
            </Row>

            <ViewModal
                visible={visible}
                setVisible={setVisible}
                record={record}
            />
        </Card>
    );
}