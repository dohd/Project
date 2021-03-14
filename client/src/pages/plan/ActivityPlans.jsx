import React from 'react';
import { Card, Space, Table, Button } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const sampleData = [
    {
        key: 1,
        plan: 'Incididunt voluptate esse aliquip.'
    },
    {
        key: 2,
        plan: 'Reprehenderit veniam do occaecat'
    }
];

export default function ActivityPlans(props) {
    const { history, toggleCreatePlan, participantsPage } = props;
    return (
        <Card
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        style={{ fontSize: '18px' }}
                        onClick={() => history.goBack()} 
                    />
                    Activity Plans
                </Space>
            }
            extra={
                <Button type='primary' onClick={toggleCreatePlan}>
                    <PlusOutlined /> Plan
                </Button>
            }
        >
            <Table
                dataSource={sampleData}
                columns={[
                    {
                        title: 'Plan',
                        dataIndex: 'plan',
                        key: 'plan'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (txt, {key}) => {
                            return (
                                <Button 
                                    type='link' 
                                    onClick={() => participantsPage(key)}
                                >
                                    Participants
                                </Button>
                            );
                        }
                    }
                ]}
            />
        </Card>
    );
}