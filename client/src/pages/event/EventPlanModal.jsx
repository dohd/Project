import React from 'react';
import { Modal, Table, Button, Card, Dropdown, Menu } from 'antd';
import { CheckOutlined, FilePdfOutlined } from '@ant-design/icons';

export default function EventPlanModal(props) {
    const {
        plans, visible, onOk, onCancel, 
        eventDate,onExport
    } = props;
    
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
                bordered={false}
                title={`Activity Plan: ${eventDate}`}
                extra={
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export
                    </Button>
                }
            >
                <Table 
                    dataSource={plans}
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
                                // const {key, activityId} = record;
                                return (
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item 
                                                    // onClick={
                                                    //     () => createParticipant(key, activityId)
                                                    // }
                                                >
                                                    create participant
                                                </Menu.Item>
                                                <Menu.Item 
                                                    danger 
                                                    // onClick={() => onDelete(key, activityId)}
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
            </Card>
        </Modal>
    );
}