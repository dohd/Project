import React from 'react';
import { Card, Space, Table, Button } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router';

import { parseUrl } from 'utils';
import { Path } from 'routes';
import { Link } from 'react-router-dom';

export default function ActivityPlans(props) {
    const { setVisible, activityPlans } = props;
    const history = useHistory();
    const params = useParams();
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
                <Button 
                    type='primary' 
                    onClick={() => setVisible(true)}
                >
                    <PlusOutlined /> Plan
                </Button>
            }
        >
            <Table
                dataSource={activityPlans}
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
                            const obj = { activityPlanId: key, ...params };
                            const path = parseUrl(Path.participants, obj);
                            return <Link to={path}>Participants</Link>;
                        }
                    }
                ]}
            />
        </Card>
    );
}