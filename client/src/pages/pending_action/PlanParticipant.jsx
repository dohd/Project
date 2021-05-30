import React from 'react';
import { Card, Space, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

import { parseUrl } from 'utils';
import { Path } from 'routes';
import { Link } from 'react-router-dom';

export default function PlanParticipant(props) {
    const { activityPlans } = props;
    const history = useHistory();

    // set objective & activity state to approved
    // to load approved pages
    sessionStorage.setItem('objectiveState', 'approved');
    sessionStorage.setItem('activityState', 'approved');

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
                        render: (txt, record) => {
                            const obj = {
                                activityPlanId: record.key,
                                activityId: record.activity.id,
                                objectiveId: record.activity.objective.id,
                                proposalId: record.activity.objective.proposal.id
                            };
                            const path = parseUrl(Path.participants, obj);
                            return <Link to={path}>Participants</Link>;
                        }
                    }
                ]}
            />
        </Card>
    );
}