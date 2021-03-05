import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

const DonorContext = createContext(null);

export default function DonorProvider({ children }) {
    const [donors, setDonors] = useState([]);

    const fetchDonors = () => {
        Api.donor.get()
        .then(res => setDonors(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchDonors, []);

    return (
        <DonorContext.Provider 
            value={{ donors, fetchDonors }}
        >
            { children }
        </DonorContext.Provider>
    );    
}

export const useDonorContext = () => useContext(DonorContext);
