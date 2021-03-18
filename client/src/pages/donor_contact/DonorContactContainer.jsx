import React, { useState, useEffect,  useRef } from 'react';
import { message } from 'antd';

import DonorContact from './DonorContact';
import Api from 'api';
import pdfExport from './pdfExport';
import { useDonorContactContext } from 'contexts';

export default function DonorContactContainer(params) {
    const [state, setState] = useState({ 
        contacts: [], record: {}, pageSize: 5,
        page: 1, pageCount: 1
    });
    
    const { donorContacts, fetchDonorContacts } = useDonorContactContext();
    useEffect(() => {
        const contacts = donorContacts.map(val => ({
            ...val, 
            key: val.id, 
            donor: val.donor.name,
            contactName: `${val.fName} ${val.lName}`,
        }));

        setState(prev => {
            const pageCount = Math.ceil(contacts.length/prev.pageSize);
            return {...prev, contacts: contacts, pageCount};
        });
    }, [donorContacts]);

    // modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };

    const onDelete = key => {
        const res = window.confirm('Sure to delete donor ?');
        if (res) {
            Api.donor.delete(key)
            .then(res => fetchDonorContacts())
            .catch(err => {
                console.log(err);
                if (err.error) message.error(err.error.message);
            });
        }
    };

    const onPageChange = page => setState(prev => ({...prev, page}));

    const tableView = useRef();
    const onExport = () => pdfExport(tableView, state);

    const props = {
        fetchDonorContacts, visible, setVisible,
        showModal, showUpdateModal, onDelete,
        onExport, tableView, state, onPageChange
    };

    return <DonorContact {...props} />;
}