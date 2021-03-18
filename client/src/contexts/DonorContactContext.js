import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

const DonorContactContext = createContext(null);

export default function DonorContactProvider({ children }) {
    const [donorContacts, setDonorContacts] = useState([]);

    const fetchDonorContacts = () => {
        Api.donorContact.get()
        .then(res => setDonorContacts(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchDonorContacts, []);

    return (
        <DonorContactContext.Provider 
            value={{ donorContacts, fetchDonorContacts }}
        >
            { children }
        </DonorContactContext.Provider>
    );    
}

export const useDonorContactContext = () => useContext(DonorContactContext);
