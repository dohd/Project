import React from 'react';
import { Card, Table, Button, Popconfirm } from 'antd';
import { UserAddOutlined, EditTwoTone, DeleteOutlined } from '@ant-design/icons';

import CreateUser from './AddUserModal';
import UpdateUser from './EditUserModal';

export default function Users(props) {
    const { 
        visible, setVisible, showModal, 
        fetchUsers, state, showUpdateModal,
        onDelete
    } = props;

    return (
        <Card
            title='Users'
            bordered={false}
            extra={
                <Button type='primary' onClick={showModal}>
                    <UserAddOutlined /> Create
                </Button>
            }
        >
            <CreateUser 
                visible={visible.create} 
                setVisible={setVisible} 
                fetchUsers={fetchUsers}
            />

            <UpdateUser 
                visible={visible.update} 
                setVisible={setVisible} 
                record={state.record}
                fetchUsers={fetchUsers}
            />

            <Table
                dataSource={state.users}
                columns={[
                    {
                        title: 'Username',
                        dataIndex: 'username',
                        key: 'username'
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email'
                    },
                    {
                        title: 'Initial',
                        dataIndex: 'initial',
                        key: 'initial'
                    },
                    {
                        title: 'Role',
                        dataIndex: 'role',
                        key: 'role',
                        render: text => text.value
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        render: (text, record) => {
                            return (
                                <div>
                                    <Button 
                                        type='link' 
                                        onClick={() => showUpdateModal(record)}
                                    >
                                        <EditTwoTone style={{ fontSize: '20px' }} />
                                    </Button>
                                    
                                    <Popconfirm
                                        title='Are you sure to delete this user?'
                                        onConfirm={onDelete}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <DeleteOutlined 
                                            style={{ color: 'red', fontSize: '18px' }} 
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