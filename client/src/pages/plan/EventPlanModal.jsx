import React, { useState, useEffect } from 'react';
import { Modal, Table, Button, Card, Dropdown, Menu, message } from 'antd';
import { CheckOutlined, FilePdfOutlined } from '@ant-design/icons';
import UrlPattern from 'url-pattern';
import { useParticipantContext } from 'contexts';
import Api from 'api';
import { Path } from 'routes';

export default function EventPlan(props) {
    const { 
        visible, setVisible, activityPlans, fetchActivityPlans,
        eventDate, tableView, onExport, pageSize,
        onPageChange, history
    } = props;
    const onCancel = () => setVisible(false);
    const onOk = () => setVisible(false);

    const [state, setState] = useState({ plans: [] });
    const { participants } = useParticipantContext();
    useEffect(() => {
        const plans = activityPlans.map(obj => {
            const plan = { 
                key: obj.id,
                activityId: obj.activity.id,
                activity: obj.activity.action,
                materials: obj.planMaterial.material,
                programme: obj.planProgramme.keyProgramme.programme
            };

            for (const p of participants) {
                if (p.activityId === plan.activityId) {
                    plan.status = 'Executed';
                    break;
                }
            }

            const regions = new Set();
            obj.planEvents.forEach(({planRegions}) => {
                planRegions.forEach(({region}) => {
                    regions.add(region.area);
                });
            });

            const groups = new Set();
            obj.planGroups.forEach(({targetGroup}) => {
                groups.add(targetGroup.group);
            });

            plan.regions = [...regions];
            plan.groups = [...groups];
            return plan;
        });

        setState({ plans });
    }, [activityPlans, participants]);

    const onDelete = (key, activityId) => {
        const res = window.confirm('Sure to delete plan ?');
        if (res) {
            Api.activityPlan.delete(key)
            .then(res => {
                fetchActivityPlans();
                setVisible(false);
            })
            .catch(err => {
                console.log(err);
                if (err.error) message.error(err.error.message);
            });
        }
    };

    const createParticipant = (planId, activityId) => {
        const pattern = new UrlPattern(Path.planParticipant());
        const path = pattern.stringify({ planId });
        history.push({ pathname: path, state: { activityId } });
    };

    return (
        <Modal
            visible={visible}
            okText='Done'
            onOk={onOk}
            onCancel={onCancel}
            cancelButtonProps={{ disabled: true }}
            width={800}
            closable={false}
        >
            <Card
                title={`Activity Plan: ${eventDate}`}
                extra={
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export
                    </Button>
                }
                bordered={false}
            >
                <div ref={tableView}>
                    <Table 
                        dataSource={state.plans}
                        pagination={{
                            pageSize,
                            total: state.plans.length,
                            onChange: onPageChange
                        }}
                        columns={[
                            {
                                title: 'Activity',
                                dataIndex: 'activity',
                                key: 'activity',
                            },
                            {
                                title: 'Programme',
                                dataIndex: 'programme',
                                key: 'programme',
                            },
                            {
                                title: 'Regions',
                                dataIndex: 'regions',
                                key: 'regions',
                                render: regions => regions.join(', ')
                            },
                            {
                                title: 'Groups',
                                dataIndex: 'groups',
                                key: 'groups',
                                render: groups => groups.join(', ')
                            },
                            {
                                title: 'Materials',
                                dataIndex: 'materials',
                                key: 'materials'
                            },
                            {
                                title: 'Status',
                                dataIndex: 'status',
                                key: 'status',
                                render: text => text ? <CheckOutlined /> : '_'
                            },
                            {
                                title: 'Action',
                                render: (text, record) => {
                                    const {key, activityId} = record;
                                    return (
                                        <Dropdown
                                            overlay={
                                                <Menu>
                                                    <Menu.Item 
                                                        onClick={() => {
                                                            return createParticipant(key, activityId);
                                                        }}
                                                    >
                                                        create participant
                                                    </Menu.Item>
                                                    <Menu.Item 
                                                        danger 
                                                        onClick={() => onDelete(key, activityId)}
                                                    >
                                                        Delete
                                                    </Menu.Item>
                                                </Menu>
                                            }
                                        >
                                           <Button type='primary' size='small' ghost>
                                                Action
                                            </Button>
                                        </Dropdown>
                                    );
                                }
                            }
                        ]} 
                    />
                </div>
            </Card>
        </Modal>
    );
}