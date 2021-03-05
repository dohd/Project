import React, { useState,useEffect } from 'react';
import { Card, Table, Button, Dropdown, Menu, message } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useProposalContext, useNarrativeContext, useAgendaContext } from 'contexts';
import UrlPattern from 'url-pattern';
import { Path } from 'routes';

export default function PendingReport({ history }) {
    const [state, setState] = useState({ activities: [] });

    const { proposals } = useProposalContext();
    const { narratives } = useNarrativeContext();
    useEffect(() => {
        const activities = [];
        const narrativeIds = narratives.map(val => val.activity.id);
        for (const p of proposals) {
            if (p.status.value === 'Approved') {
                for(const obj of p.objectives) {
                    for (const activity of obj.activities) {
                        if (narrativeIds.indexOf(activity.id) === -1) {
                            const obj = {...activity};
                            obj.key = obj.id;
                            obj.activity = obj.action;
                            activities.push(obj);
                        }
                    }
                }
            }
        }
        setState({ activities });
    }, [proposals, narratives]);

    const createAgenda = key => {
        const pattern = new UrlPattern(Path.updatePendingAgenda());
        const path = pattern.stringify({ activityId: key });
        history.push(path);
    };

    const { agenda } = useAgendaContext();
    const createReport = key => {
        let exists;
        for (const obj of agenda) {
            if (obj.activityId === key) {
                exists = true;
                break;
            }
        }
        if (!exists) return message.error('Add an agenda!');
        const pattern = new UrlPattern(Path.updatePendingReport());
        const path = pattern.stringify({ activityId: key });
        history.push(path);
    };

    return (
        <Card
            title='Pending Reports Activities'
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
                        title: 'Action',
                        key: 'action',
                        render: (text, {key}) => {
                            return (
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item
                                                onClick={() => createAgenda(key)}
                                            >
                                                <PlusOutlined /> Agenda
                                            </Menu.Item>
                                            <Menu.Item
                                                onClick={() => createReport(key)}
                                            >
                                                <PlusOutlined /> Report
                                            </Menu.Item>
                                        </Menu>
                                    }
                                >
                                    <Button type='link'>
                                        actions <DownOutlined />
                                    </Button>
                                </Dropdown>
                            );
                        }
                    }
                ]}
            />
        </Card>
    );
}