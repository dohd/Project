import React from 'react';
import { Card, Table, Button, Space } from 'antd';
import { 
    ArrowLeftOutlined, EditTwoTone, DeleteOutlined,
    FilePdfOutlined, PlusOutlined
} from '@ant-design/icons';
import EditActivity from './EditActivityModal'
import AddActivity from './AddActivityModal';

export default function PendingActivities(props) {
    const { 
        history, onExport, visible, setVisible, fetchProposals,
        state, tableView, onPageChange, showAddModal, onDelete,
        showEditModal, objectiveId
    } = props;

    return (
        <Card 
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        style={{fontSize: '18px'}}
                        onClick={() => history.goBack()} 
                    />
                    Pending Proposal's Activities
                </Space>       
            }
            extra={
                <Space>
                    <Button type='primary' onClick={showAddModal}>
                        <PlusOutlined /> Add
                    </Button>
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined /> Export
                    </Button>
                </Space>
            }
        >
            <EditActivity
                visible={visible.edit}
                setVisible={setVisible}
                fetchProposals={fetchProposals}
                record={state.record}
            />

            <AddActivity
                visible={visible.add}
                setVisible={setVisible}
                fetchProposals={fetchProposals}
                objectiveId={objectiveId}
            />

            <div ref={tableView}>
                <Table 
                    dataSource={state.activities}
                    pagination={{
                        pageSize: state.pageSize,
                        total: state.activities.length,
                        onChange: onPageChange
                    }}
                    columns={[
                        {
                            title: 'Activity',
                            dataIndex: 'action',
                            key: 'activity',
                        },
                        {
                            title: 'Action',
                            key: 'action',
                            render: (text, record) => {
                                return (        
                                    <Space>
                                        <Button 
                                            type='link' 
                                            onClick={() => showEditModal(record)}
                                        >
                                            <EditTwoTone style={{fontSize: '20px'}} />
                                        </Button>
                                        <Button 
                                            type='link' 
                                            onClick={() => onDelete(record.key)}
                                        >
                                            <DeleteOutlined style={{color: 'red', fontSize: '18px'}} />
                                        </Button>
                                    </Space>
                                );
                            }
                        }
                    ]} 
                />
            </div>    
        </Card>
    );
}