import React from 'react';
import { Card, Space, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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

export default function ActivityPlans(params) {
    return (
        <Card
            bordered={false}
            title={
                <Space>
                    Activity Plans
                </Space>
            }
            extra={
                <Button type='primary'>
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
                                <Button type='link'>
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