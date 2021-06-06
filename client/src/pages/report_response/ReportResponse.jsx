import React from 'react';
import { Table, Card, Space, Button, Popconfirm } from 'antd';
import { ArrowLeftOutlined, EditTwoTone, DeleteOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

import EditResponseModal from './EditResponseModal';

export default function ReportResponse(props) {
    const history = useHistory();
    const {
        visible, setVisible, record, state, onDelete,
        showModal, fetchNarratives
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
                    Report
                </Space>  
            }
        >
            <EditResponseModal 
                visible={visible}
                setVisible={setVisible}
                record={record}
                fetchNarratives={fetchNarratives}
            />

            <Table
                dataSource={state.quiz}
                columns={[
                    {
                        title: 'Question',
                        dataIndex: 'quiz',
                        key: 'quiz'
                    }
                ]}
                expandable={{ 
                    expandedRowRender({key}) {
                        const data = state.responses.filter(v => v.quizId === key);
                        return (
                            <Table 
                                pagination={false}
                                dataSource={data}
                                columns={[
                                    {
                                        title: 'Response',
                                        dataIndex: 'response',
                                        key: 'response'
                                    },
                                    {
                                        title: 'Task',
                                        dataIndex: 'task',
                                        key: 'task'
                                    },
                                    {
                                        title: 'Action',
                                        key: 'action',
                                        render: (txt, record) => {
                                            return (
                                                <Space>
                                                    <Button 
                                                        type='link' 
                                                        onClick={() => showModal(record)}
                                                        icon={
                                                            <EditTwoTone style={{ fontSize: '20px' }} />
                                                        }
                                                    />                                                    
                                                    <Popconfirm
                                                        title='Are you sure to delete this response?'
                                                        onConfirm={() => onDelete(record.key)}
                                                        okText='Yes'
                                                        cancelText='No'
                                                    >
                                                        <Button
                                                            type='link'
                                                            icon={
                                                                <DeleteOutlined 
                                                                    style={{ color: 'red', fontSize: '18px' }} 
                                                                />
                                                            }
                                                        />
                                                    </Popconfirm>
                                                </Space>
                                            );
                                        }
                                    }
                                ]}
                            />
                        );
                    }
                }}
            />
        </Card>
    );
}