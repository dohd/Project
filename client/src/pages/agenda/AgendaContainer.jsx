import React, { useState, useEffect, useRef } from 'react';
import { useAgendaContext } from 'contexts';
import Api from 'api';
import Agenda from './Agenda';
import pdfExport from './pdfExport';
import UrlPattern from 'url-pattern';
import { Path } from 'routes';

export default function AgendaContainer({ history, match }) { 
    const [visible, setVisible] = useState({ create: false, update: false });
    const showCreateModal = () => setVisible(prev => ({ ...prev, create: true }));
    const showUpdateModal = record => {
        setState(prev => ({ ...prev, record }));
        setVisible(prev => ({ ...prev, update: true }));
    };

    const [state, setState] = useState({ 
        agenda: [], record: {}, pageSize: 5,
        page: 1, pageCount: 2
    });
    const { agenda, fetchAgenda } = useAgendaContext();
    const { activityId } = match.params;

    useEffect(() => {
        const list = agenda.filter(agenda => {
            agenda.key = agenda.id;
            const { startTime, endTime } = agenda;
            agenda.time = [startTime, endTime].join(' - ');
            return agenda.activityId === Number(activityId);
        });
        setState(prev => {
            const pageCount = Math.ceil(list.length/prev.pageSize);
            return {...prev, agenda: list, pageCount};
        });
    }, [agenda, activityId]);

    const onDelete = key => {
        const res = window.confirm('Sure to delete agenda ?');
        if (res) {
            Api.agenda.delete(key)
            .then(res => fetchAgenda())
            .catch(err => console.log(err));
        }
    };

    const onPageChange = page => setState(prev => ({...prev, page}));

    const tableView = useRef();
    const onExport = () => pdfExport(tableView, state);

    const reportPage = () => {
        const params = new UrlPattern(Path.agenda()).match(match.url);
        const pattern = new UrlPattern(Path.narrativeReport());
        const path = pattern.stringify({...params});
        history.push(path);
    };

    const props = {
        state, visible, setVisible, showCreateModal, 
        showUpdateModal, history, fetchAgenda, onDelete,
        tableView, onExport, onPageChange, reportPage
    };

    return <Agenda {...props} />;
}
