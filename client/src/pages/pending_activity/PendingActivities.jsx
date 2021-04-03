import React from 'react';
import { Card, Table, Button, Space, Popconfirm } from 'antd';
import { useHistory } from 'react-router-dom';
import { 
    ArrowLeftOutlined, EditTwoTone, DeleteOutlined,
    FilePdfOutlined, PlusOutlined
} from '@ant-design/icons';

import EditActivity from './EditActivityModal'
import AddActivity from './AddActivityModal';

export default function PendingActivities(props) {
    const { 
        onExport, visible, setVisible,
        state, showAddModal, onDelete, 
        showEditModal, fetchProposals
    } = props;
    const history = useHistory();

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
            />

            <Table 
                dataSource={state.activities}
                columns={[
                    {
                        title: 'Activity',
                        dataIndex: 'activity',
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
                                        icon={
                                            <EditTwoTone style={{fontSize: '20px'}} />
                                        }
                                    />
                                    <Popconfirm
                                        title='Are you sure to delete this activity?'
                                        onConfirm={() => onDelete(record.key)}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button 
                                            type='link' 
                                            icon={
                                                <DeleteOutlined style={{color: 'red'}} />
                                            }
                                        />
                                    </Popconfirm>
                                </Space>
                            );
                        }
                    }
                ]} 
            />
        </Card>
    );
}