import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'antd';
import { UserAddOutlined, EditTwoTone, DeleteOutlined } from '@ant-design/icons';
import { useUserContext } from 'contexts';
import Api from 'api';
import CreateUser from './AddUserModal';
import UpdateUser from './EditUserModal';

export default function Users() {
    const { users, fetchUsers } = useUserContext();
    const [state, setState] = useState({ 
        users: [], record: {}, pageSize: 5
    });
    
    useEffect(() => {
        const list = users.map(val => ({...val, key: val.id}));
        setState(prev => ({...prev, users: list}));
    }, [users]);

    const onDelete = key => {
        const res = window.confirm('Sure to delete user ?');
        if (res) {
            Api.user.delete(key)
            .then(res => fetchUsers())
            .catch(err => console.log(err));
        }
    };

    // Modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };

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
                pagination={{
                    pageSize: state.pageSize,
                    total: state.users.length
                }}
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
                                    <Button 
                                        type='link' 
                                        onClick={() => onDelete(record.key)}
                                    >
                                        <DeleteOutlined 
                                            style={{ color: 'red', fontSize: '18px' }} 
                                        />
                                    </Button>
                                </div>
                            );
                        }
                    }

                ]}
            />
        </Card>
    );
}