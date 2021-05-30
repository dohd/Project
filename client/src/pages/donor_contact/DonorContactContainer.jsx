import React, { useState, useEffect } from 'react';

import DonorContact from './DonorContact';
import pdfExport from './pdfExport';
import Api from 'api';
import { useTracked } from 'context';

const fetchDonorContacts = dispatch => {
    Api.donorContact.get()
    .then(res => dispatch({
        type: 'addDonorContacts',
        payload: res
    }));
};

export default function DonorContactContainer(params) {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({ 
        contacts: [], record: {}, donors: []
    });
    
    useEffect(() => {
        const contacts = store.donorContacts.map(val => ({
            ...val, 
            key: val.id, 
            donor: val.donor.name,
            contactName: `${val.fName} ${val.lName}`,
        }));
        setState(prev => ({...prev, contacts, donors: store.donors}));
    }, [store.donorContacts, store.donors]);

    const onDelete = key => {
        Api.donorContact.delete(key)
        .then(res => fetchDonorContacts(dispatch));
    };

    const tableView = ''
    const onExport = () => pdfExport(tableView, state);

    // modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };

    const props = {
        visible, setVisible,showModal, 
        showUpdateModal, onDelete,
        onExport, state, 
        fetchDonorContacts: () => fetchDonorContacts(dispatch)
    };
    return <DonorContact {...props} />;
}