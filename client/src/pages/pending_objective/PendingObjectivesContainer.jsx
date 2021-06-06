import React, { useState, useEffect,  useRef } from 'react';

import PendingObjectives from './PendingObjectives';
import pdfExport from './pdfExport';
import Api from 'api';
import { Path } from 'routes';
import { useParams } from 'react-router-dom';
import { useTracked } from 'context';
import { clientSocket, parseUrl } from 'utils';

const fetchProposals = dispatch => {
    Api.proposal.get()
    .then(res => {
        dispatch({
            type: 'addProposals',
            payload: res
        });
        clientSocket.emit('proposals', res);
    });
};

export default function PendingObjectivesContainer() {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({ 
        objectives: [], record: {}
    });
    
    const { proposalId } = useParams();
    useEffect(() => {
        let objectives = [];
        for (const proposal of store.proposals) {
            if (proposal.id === parseInt(proposalId)) {
                objectives = proposal.objectives.map(val => ({
                    key: val.id, 
                    objective: val.objective,
                    updatedAt: new Date(val.updatedAt)
                }))
                .sort((a, b) => b.updatedAt - a.updatedAt );
                break;
            }
        }
        setState(prev => ({...prev, objectives}));
    }, [store.proposals, proposalId]);

    const onDelete = key => {
        Api.objective.delete(key)
        .then(res => fetchProposals(dispatch));          
    };

    const pendingAct = key => {
        sessionStorage.setItem('activityState', 'pending');
        const params = { objectiveId: key, proposalId };
        return parseUrl(Path.activities, params);
    };

    const tableView = useRef();
    const onExport = () => pdfExport(tableView, state);

    // Modal logic
    const [visible, setVisible] = useState({ add: false, edit: false });
    const showEditModal = record => {
        setState(prev => ({...prev, record}));
        setVisible({edit: true, add: false});
    };
    const showAddModal = () => setVisible({add: true, edit: false});

    const props = { 
        onExport, visible, setVisible, 
        state, showAddModal, onDelete,
        pendingAct, showEditModal,
        fetchProposals: () => fetchProposals(dispatch)
    };

    return <PendingObjectives {...props} />;
}