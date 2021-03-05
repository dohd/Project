import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

export const ProgrammeContext = createContext(null);

export default function ProgrammeProvider({ children }) {
    const [programmes, setProgrammes] = useState([]);
    
    const fetchProgrammes = () => {
        Api.keyProgramme.get()
        .then(res => setProgrammes(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchProgrammes, []);

    return (
        <ProgrammeContext.Provider 
            value={{ programmes, fetchProgrammes }}
        >
            { children }
        </ProgrammeContext.Provider>
    );    
}

export const useProgrammeContext = () => useContext(ProgrammeContext);
