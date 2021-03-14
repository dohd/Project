import React from 'react';
import { Card, Space, Table } from 'antd';

export default function ActivityPlans(params) {
    return (
        <Card
            title={
                <Space>
                    Activity Plans
                </Space>
            }
        >
            <Table
                columns={[
                    {
                        title: 'Plan',
                        dataIndex: 'Plan',
                        key: 'plan'
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action'
                    }
                ]}
            />
        </Card>
    );
}