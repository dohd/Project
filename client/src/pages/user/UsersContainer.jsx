import React, { useState, useEffect } from 'react';

import Users from './Users';
import Api from 'api';
import { useTracked } from 'context';
import { clientSocket } from 'utils';

const fetchUsers = dispatch => {
    Api.user.get()
    .then(res => {
        dispatch({
            type: 'addUsers',
            payload: res
        });
        clientSocket.emit('users', res);
    });
};

export default function UsersContainer() {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({
        users: [], record: {}, roles: []
    });

    useEffect(() => {
        const usersList = store.users.map(val => ({...val, key: val.id}));
        setState(prev => ({...prev, users: usersList, roles: store.roles}));
    }, [store.users, store.roles]);

    const onDelete = key => {
        Api.user.delete(key)
        .then(res => fetchUsers(dispatch));
    };

    // Modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };
    
    const props = {
        state, visible, setVisible, showModal, 
        showUpdateModal, onDelete, 
        fetchUsers: () => fetchUsers(dispatch)
    };
    return <Users {...props} />;
}