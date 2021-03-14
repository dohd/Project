import React, { useState, useEffect, useRef } from 'react';
import UrlPattern from 'url-pattern';

import Participants from './Participants';
import pdfExport from './participantsPdfExport';
import { useParticipantContext } from 'contexts';
import Api from 'api';
import { Path } from 'routes';

export default function ParticipantsContainer({ match, history }) {
    const { activityId } = match.params;

    const { participants, fetchParticipants } = useParticipantContext();
    const [state, setState] = useState({ 
        participants: [], pageSize: 5,
        page: 1, pageCount: 1
    });

    useEffect(() => {
        const act_participants = [];
        for (const participant of participants) {
            if (participant.activityId === Number(activityId)) {
                const data = {...participant};
                data.key = data.id;
                data.name = `${data.fName} ${data.lName}`;
                data.programme = data.keyProgramme.programme;
                data.gender = participant.gender.type;
                act_participants.push(data);
            }
        }
        setState(prev => {
            const pageCount = Math.ceil(act_participants.length/prev.pageSize);
            return {...prev, participants: act_participants, pageCount};
        });
    }, [participants, activityId]);

    const createParticipant = () => {
        const params = new UrlPattern(Path.participants()).match(match.url);
        const pattern = new UrlPattern(Path.createParticipant());
        const path = pattern.stringify({...params})
        history.push(path);
    };
    const updateParticipant = key => {
        const params = new UrlPattern(Path.participants()).match(match.url);
        const pattern = new UrlPattern(Path.updateParticipant());
        const path = pattern.stringify({ participantId: key, ...params});
        history.push(path);
    };

    const onDelete = key => {
        const res = window.confirm('Sure to delete  participant ?');
        if (res) {
            Api.participant.delete(key)
            .then(res => fetchParticipants())
            .catch(err => console.log(err));
        }              
    };

    const onPageChange = page => setState(prev => ({...prev, page}));

    const tableView = useRef();
    const onExport = () => pdfExport(tableView, state);

    const agendaPage = () => {
        const params  = new UrlPattern(Path.participants()).match(match.url);
        const pattern = new UrlPattern(Path.agenda());
        const path = pattern.stringify({ ...params });
        history.push(path);
    };

    const props = { 
        state, onDelete, history, onExport, 
        tableView, onPageChange, createParticipant,
        updateParticipant, agendaPage
    };

    return <Participants {...props} />;
}
