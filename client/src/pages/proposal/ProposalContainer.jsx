import React, { useState, useEffect,  useRef } from 'react';
import { useProposalContext } from 'contexts';
import Api from 'api';
import Proposal from './Proposal';
import UrlPattern from 'url-pattern';
import { Path } from 'routes';
import pdfExport from './pdfExport';

export default function Proposals({ history }) {
    const { proposals, fetchProposals } = useProposalContext();
    const [state, setState] = useState({
        proposals: [], record: {}, pageSize: 10,
        page: 1, pageCount: 1
    });

    useEffect(() => {
        const list = proposals.map(val => {
            return {
                key: val.id,
                title: val.title,
                startPeriod: val.startPeriod,
                endPeriod: val.endPeriod,
                budget: val.budget,
                dateSubmitted: val.dateSubmitted,
                status: val.status.value,
                statusId: val.status.id,
                donor: val.donor.name
            };
        });
        setState(prev => {
            const pageCount = Math.ceil(list.length/prev.pageSize);
            return {...prev, proposals: list, pageCount};
        });
    }, [proposals]);
    
    const onDelete = key => {
        const res = window.confirm('Sure delete this proposal ?');
        if (res) {
            Api.proposal.delete(key)
            .then(res => fetchProposals())
            .catch(err => console.log(err));
        }              
    };

    const setApprovedObj = key => {
        sessionStorage.obj_state = 'approved';
        const pattern = new UrlPattern(Path.objectives());
        const path = pattern.stringify({ proposalId: key });
        history.push(path);
    };

    const setPendingObj = key => {
        sessionStorage.obj_state = 'pending';
        const pattern = new UrlPattern(Path.objectives());
        const path = pattern.stringify({ proposalId: key });
        history.push(path);
    }

    const updatePending = key => {
        const pattern = new UrlPattern(Path.updateProposal());
        const path = pattern.stringify({ proposalId: key });
        history.push(path);
    };

    const createProposal = () => history.push(Path.createProposal());

    // Approved proposal modal
    const [visible, setVisible] = useState(false);
    const showModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(true);
    };

    const onPageChange = page => setState(prev => ({...prev, page}));

    const tableView = useRef();
    const onExport = () => pdfExport(tableView, state);

    const props = {
        onDelete, fetchProposals, visible, setVisible, createProposal,
        showModal, tableView, onExport, state, onPageChange,
        setPendingObj, setApprovedObj, updatePending
    };
    
    return <Proposal {...props} />;
}