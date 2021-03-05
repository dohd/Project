import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

const ParticipantContext = createContext(null);

export default function ParticipantProvider({ children }) {
    const [participants, setParticipants] = useState([]);
        
    const fetchParticipants = () => {
        Api.participant.get()
        .then(res => setParticipants(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchParticipants, []);

    return (
        <ParticipantContext.Provider 
            value={{ participants, fetchParticipants }}
        >
            { children }
        </ParticipantContext.Provider>
    );
}

export const useParticipantContext = () => useContext(ParticipantContext);
