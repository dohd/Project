import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useProposalContext, useActivityPlanContext, useParticipantContext } from 'contexts';
import UrlPattern from 'url-pattern';
import { Path } from 'routes';

export default function Implement({ history }) {
    const [state, setState] = useState({ activities: [] });

    const { proposals } = useProposalContext()
    const { activityPlans } = useActivityPlanContext();
    const { participants } = useParticipantContext();
    useEffect(() => {
        const parts = participants.map(val => val.activityId);
        const activities = [];
        for (const p of proposals) {
            if (p.status.value === 'Approved') {
                for(const obj of p.objectives) {
                    for (const activity of obj.activities) {
                        let counter = 0;
                        for (const plan of activityPlans) {
                            if (plan.activity.id === activity.id) {
                                counter++
                            }
                        }
                        if (counter && parts.indexOf(activity.id) === -1) {
                            const obj = {...activity};
                            obj.key = obj.id;
                            obj.activity = obj.action;
                            obj.plans = counter;
                            activities.push(obj);
                        }
                    }
                }
            }
        }
        setState({ activities });
    }, [proposals, activityPlans, participants]);

    const createParticipant = key => {
        const pattern = new UrlPattern(Path.implementParticipant());
        const path = pattern.stringify({ activityId: key });
        history.push(path);
    };

    return (
        <Card
            title='Activity Implementation'
            bordered={false}
        >
            <Table 
                dataSource={state.activities}
                columns={[
                    {   
                        title: 'Activity',
                        dataIndex: 'activity',
                        key: 'activity'
                    },
                    {
                        title: 'Plans',
                        dataIndex: 'plans',
                        key: 'plans',
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (text, {key}) => {
                            return (
                                <Button 
                                    onClick={() => createParticipant(key)}
                                    icon={<PlusOutlined />}
                                    type='link' 
                                >
                                    participant
                                </Button>
                            );
                        }
                    }
                ]}
            />
        </Card>
    );
}