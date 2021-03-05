import React from 'react';
import { 
    Card, Table, Button, Space, Menu, Dropdown 
} from 'antd';
import { 
    ArrowLeftOutlined, FilePdfOutlined, PlusOutlined,
    DownOutlined
} from '@ant-design/icons';
import EditObjective from './EditObjectiveModal';
import AddObjective from './AddObjectiveModal';

export default function PendingObjectives(props) {
    const { 
        history, onExport, visible, setVisible, fetchProposals,
        state, tableView, onPageChange, showAddModal, onDelete,
        pendingAct, showEditModal, proposalId
    } = props;

    return (
        <Card 
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()} 
                        style={{fontSize: '18px'}}
                    />
                    Pending Proposal's Objectives
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
                proposalId={proposalId}
            />

            <div ref={tableView}>
                <Table 
                    dataSource={state.objectives}
                    pagination={{
                        pageSize: state.pageSize,
                        total: state.objectives.length,
                        onChange: onPageChange
                    }}
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
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item onClick={() => showEditModal(record)}>
                                                    Update
                                                </Menu.Item>
                                                <Menu.Item danger onClick={() => onDelete(key)}>
                                                    Delete
                                                </Menu.Item>
                                                <Menu.Item onClick={() => pendingAct(key)}>
                                                    Activities
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
            </div>
        </Card>
    );
}