import React, { useState, useEffect,  useRef } from 'react';
import { message } from 'antd';
import UrlPattern from 'url-pattern';
import { useProposalContext } from 'contexts';
import Api from 'api';
import { Path } from 'routes';
import PendingObjectives from './PendingObjectives';
import pdfExport from './pdfExport';

export default function PendingObjectivesContainer({ history, match }) {
    const { proposalId } = match.params;
    const { proposals, fetchProposals } = useProposalContext();
    const [state, setState] = useState({ 
        objectives: [], record: {}, pageSize: 5,
        page: 1, pageCount: 1
    });
    
    useEffect(() => {
        let objectives = [];
        for (const proposal of proposals) {
            if (proposal.id === Number(proposalId)) {
                objectives = proposal.objectives.map(val => ({
                    key: val.id, objective: val.objective
                }));
                break;
            }
        }
        setState(prev => {
            const pageCount = Math.ceil(objectives.length/prev.pageSize);
            return {...prev, objectives, pageCount};
        });
    }, [proposals, proposalId]);

    const onDelete = key => {
        const res = window.confirm('Sure delete this objective ?');
        if (res) {
            Api.objective.delete(key)
            .then(res => fetchProposals())
            .catch(err => {
                console.log(err);
                if (err.errror) message.error(err.error.message);
            });
        }              
    };

    const pendingAct = key => {
        sessionStorage.act_state = 'pending';
        const params = new UrlPattern(Path.objectives()).match(match.url);
        const pattern = new UrlPattern(Path.activities());
        const path = pattern.stringify({ objectiveId: key, ...params });
        history.push(path);
    };

    // Modal logic
    const [visible, setVisible] = useState({ add: false, edit: false });
    const showEditModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, edit: true}));
    };
    const showAddModal = () => setVisible(prev => ({...prev, add: true}));

    const onPageChange = page => setState(prev => ({...prev, page}));

    const tableView = useRef();
    const onExport = () => pdfExport(tableView, state);

    const props = { 
        history, onExport, visible, setVisible, fetchProposals,
        state, tableView, onPageChange, showAddModal, onDelete,
        pendingAct, showEditModal, proposalId
    };

    return <PendingObjectives {...props} />;
}