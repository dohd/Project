import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Agenda from './Agenda';
import pdfExport from './pdfExport';
import Api from 'api';
import { useTracked } from 'context';

const fetchAgenda = dispatch => {
    Api.agenda.get()
    .then(res => dispatch({
        type: 'addAgenda',
        payload: res
    }));
}

export default function AgendaContainer({ history }) { 
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({ 
        agenda: [], record: {}
    });

    const { activityId } = useParams();
    useEffect(() => {
        const list = store.agenda.filter(v => {
            v.key = v.id;
            const { startTime, endTime } = v;
            v.time = [startTime, endTime].join(' - ');
            return v.activityId === parseInt(activityId);
        });
        setState(prev => ({...prev, agenda: list}));
    }, [store.agenda, activityId]);

    const onDelete = key => {
        Api.agenda.delete(key)
        .then(res => fetchAgenda(dispatch));
    };

    const tableView = {};
    const onExport = () => pdfExport(tableView, state);

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
        showUpdateModal, onDelete, onExport, 
        fetchAgenda: () => fetchAgenda(dispatch)
    };
    return <Agenda {...props} />;
}
