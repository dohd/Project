import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

const ProposalContext = createContext(null);

export default function ProposalProvider({ children }) {
    const [proposals, setProposals] = useState([]);
    
    const fetchProposals = () => {
        Api.proposal.get()
        .then(res => setProposals(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchProposals, []);

    return (
        <ProposalContext.Provider 
            value={{ proposals, fetchProposals }}
        >
            { children }
        </ProposalContext.Provider>
    );    
}

export const useProposalContext = () => useContext(ProposalContext);
