import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

const NarrativeContext = createContext(null);

export default function NarrativeProvider({ children }) {
    const [narratives, setNarratives] = useState([]);
        
    const fetchNarratives = () => {
        Api.narrative.get()
        .then(res => setNarratives(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchNarratives, []);

    return (
        <NarrativeContext.Provider 
            value={{ narratives, fetchNarratives }}
        >
            { children }
        </NarrativeContext.Provider>
    );
}

export const useNarrativeContext = () => useContext(NarrativeContext);