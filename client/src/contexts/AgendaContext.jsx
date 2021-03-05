import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

const AgendaContext = createContext(null);

export default function AgendaProvider({ children }) {
    const [agenda, setAgenda] = useState([]);
    
    const fetchAgenda = () => {
        Api.agenda.get()
        .then(res => setAgenda(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchAgenda, []);

    return (
        <AgendaContext.Provider 
            value={{ agenda, fetchAgenda }}
        >
            { children }
        </AgendaContext.Provider>
    );
}

export const useAgendaContext = () => useContext(AgendaContext);