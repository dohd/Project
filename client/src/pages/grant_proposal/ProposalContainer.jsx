import React, { useState, useEffect,  useRef } from 'react';

import Proposal from './Proposal';
import pdfExport from './pdfExport';
import Api from 'api';
import { Path } from 'routes';
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

export default function Proposals({ history }) {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({
        proposals: [], record: {}
    });

    useEffect(() => {
        const proposals = store.proposals.map(val => ({
            key: val.id,
            title: val.title,
            startPeriod: val.startPeriod,
            endPeriod: val.endPeriod,
            budget: val.budget,
            dateSubmitted: val.dateSubmitted,
            status: val.status,
            donor: val.donor.name
        }));
        setState(prev => ({...prev, proposals}));
    }, [store.proposals]);
    
    const onDelete = key => {
        Api.proposal.delete(key)
        .then(res => fetchProposals(dispatch));
    };

    const setApprovedObj = key => {
        sessionStorage.setItem('objectiveState', 'approved');
        const params = { proposalId: key };
        return parseUrl(Path.objectives, params);
    };

    const setPendingObj = key => {
        sessionStorage.setItem('objectiveState', 'pending');
        const params = { proposalId: key };
        return parseUrl(Path.objectives, params);
    }

    const tableView = useRef();
    const onExport = () => pdfExport(tableView, state);

    // Approved proposal modal
    const [visible, setVisible] = useState(false);
    const showModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(true);
    };

    const props = {
        onDelete, visible, setVisible,
        showModal, onExport, state, setPendingObj, 
        setApprovedObj,
        fetchProposals: () => fetchProposals(dispatch)
    };
    return <Proposal {...props} />;
}