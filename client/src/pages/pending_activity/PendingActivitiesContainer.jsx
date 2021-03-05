import React, { useState, useEffect,  useRef } from 'react';
import { useProposalContext } from 'contexts';
import Api from 'api';
import PendingActivities from './PendingActivities';
import pdfExport from './pdfExport';

export default function PendingActivitesContainer({ match, history }) {
    const { objectiveId } = match.params;
    const { proposals, fetchProposals } = useProposalContext();
    const [state, setState] = useState({ 
        activities: [], record: {}, pageSize: 5,
        page: 1, pageCount: 1
    });

    useEffect(() => {
        let activities = [];
        proposal_loop: 
        for(const proposal of proposals) {
            for (const obj of proposal.objectives) {
                if (obj.id === Number(objectiveId)) {
                    activities = obj.activities.map(val => ({
                        key: val.id, action: val.action 
                    }));
                    break proposal_loop;
                }
            }
        }
        setState(prev => ({...prev, activities}));
    }, [proposals, objectiveId]);

    const onDelete = key => {
        const res = window.confirm('Sure delete this activity ?');
        if (res) {
            Api.activity.delete(key)
            .then(res => fetchProposals())
            .catch(err => console.log(err));
        }              
    };

    // Modal logic
    const [visible, setVisible] = useState({ add: false, edit: false});
    const showEditModal = record => { 
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, edit: true}));
    };
    const showAddModal = () => setVisible(prev => ({...prev, add: true}))

    const onPageChange = page => setState(prev => ({...prev, page}));
    
    const tableView = useRef();
    const onExport = () => pdfExport(tableView, state);

    const props = { 
        history, onExport, visible, setVisible, fetchProposals,
        state, tableView, onPageChange, showAddModal, onDelete,
        showEditModal, objectiveId
    };

    return <PendingActivities {...props} />;
}