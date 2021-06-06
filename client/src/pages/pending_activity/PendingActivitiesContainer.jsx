import React, { useState, useEffect,  useRef } from 'react';

import PendingActivities from './PendingActivities';
import pdfExport from './pdfExport';
import Api from 'api';
import { useParams } from 'react-router-dom';
import { useTracked } from 'context';
import { clientSocket } from 'utils';

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

export default function PendingActivitesContainer() {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({ 
        activities: [], record: {}
    });

    const { objectiveId } = useParams();
    useEffect(() => {
        let activities = [];
        proposal_loop: 
        for(const proposal of store.proposals) {
            for (const obj of proposal.objectives) {
                if (obj.id === parseInt(objectiveId)) {
                    activities = obj.activities.map(v => ({
                        key: v.id, 
                        activity: v.action,
                        updatedAt: new Date(v.updatedAt)
                    }))
                    .sort((a,b) => b.updatedAt - a.updatedAt);
                    break proposal_loop;
                }
            }
        }
        setState(prev => ({...prev, activities}));
    }, [store.proposals, objectiveId]);

    const onDelete = key => {
        Api.activity.delete(key)
        .then(res => fetchProposals(dispatch));             
    };

    const tableView = useRef();
    const onExport = () => pdfExport(tableView, state);

    // Modal logic
    const [visible, setVisible] = useState({ add: false, edit: false});
    const showEditModal = record => { 
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, edit: true}));
    };
    const showAddModal = () => setVisible(prev => ({...prev, add: true}))
    
    const props = { 
        state, onExport, visible, setVisible, 
        showAddModal, onDelete, showEditModal,
        fetchProposals: () => fetchProposals(dispatch)
    };
    return <PendingActivities {...props} />;
}