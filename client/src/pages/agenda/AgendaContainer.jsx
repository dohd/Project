import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Agenda from './Agenda';
import Api from 'api';
import { useTracked } from 'context';
import { clientSocket } from 'utils';

const fetchAgenda = dispatch => {
    Api.agenda.get()
    .then(res => {
        dispatch({
            type: 'addAgenda',
            payload: res
        });
        clientSocket.emit('agenda', res);
    });
};

export default function AgendaContainer() { 
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({ 
        agenda: [], record: {}
    });

    const { activityId } = useParams();
    useEffect(() => {
        const list = store.agenda.filter(v => {
            if (v.activityId === parseInt(activityId)) {
                v.key = v.id;
                v.time = [v.startTime, v.endTime].join(' - ');
                return true;
            }
            return false;
        });
        setState(prev => ({...prev, agenda: list}));
    }, [store.agenda, activityId]);

    const onDelete = key => {
        Api.agenda.delete(key)
        .then(res => fetchAgenda(dispatch));
    };

    // modal logic
    const [visible, setVisible] = useState({ 
        create: false, update: false 
    });
    const showCreateModal = () => setVisible(prev => ({ 
        ...prev, create: true 
    }));
    const showUpdateModal = record => {
        setState(prev => ({ ...prev, record }));
        setVisible(prev => ({ ...prev, update: true }));
    };

    const props = {
        state, visible, setVisible, showCreateModal, 
        showUpdateModal, onDelete,
        fetchAgenda: () => fetchAgenda(dispatch)
    };
    return <Agenda {...props} />;
}
