import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { 
    Card, Table, Button, Space, Menu, 
    Dropdown, Popconfirm
} from 'antd';
import { 
    ArrowLeftOutlined, FilePdfOutlined, 
    PlusOutlined, DownOutlined, DeleteOutlined
} from '@ant-design/icons';

import EditObjective from './EditObjectiveModal';
import AddObjective from './AddObjectiveModal';

export default function PendingObjectives(props) {
    const { 
        onExport, visible, setVisible, 
        state, showAddModal, onDelete,
        pendingAct, showEditModal,
        fetchProposals,
    } = props;
    const history = useHistory();

    return (
        <Card 
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()} 
                        style={{fontSize: '18px'}}
                    />
                    Pending Proposal Objectives
                </Space>
            }
            extra={
                <Space>
                    <Button type='primary' onClick={showAddModal}>
                        <PlusOutlined />Add
                    </Button>
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export
                    </Button>
                </Space>
            }
        >
            <EditObjective 
                visible={visible.edit}
                setVisible={setVisible}
                fetchProposals={fetchProposals}
                record={state.record}
            />

            <AddObjective 
                visible={visible.add}
                setVisible={setVisible}
                fetchProposals={fetchProposals}
            />

            <Table 
                dataSource={state.objectives}
                columns={[
                    {
                        title: 'Objective',
                        dataIndex: 'objective',
                        key: 'objective',
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        render: (text, record) => {
                            const { key } = record;
                            return (
                                <div>
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item onClick={() => showEditModal(record)}>
                                                    Update
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link to={pendingAct(key)}>
                                                        Activities
                                                    </Link>
                                                </Menu.Item>
                                            </Menu>
                                        }
                                    >   
                                        <Button type='link'>
                                            actions <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                    <Popconfirm
                                        title='Are you sure to delete this objective?'
                                        onConfirm={() => onDelete(key)}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button
                                            type='link'
                                            icon={
                                                <DeleteOutlined 
                                                    style={{ color: 'red'}} 
                                                />
                                            }
                                        />
                                    </Popconfirm>
                                </div>
                            );
                        }
                    }                    
                ]} 
            />
        </Card>
    );
}