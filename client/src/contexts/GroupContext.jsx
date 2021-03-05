import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

const GroupContext = createContext(null);

export default function GroupProvider({ children }) {
    const [targetGroups, setTargetGroups] = useState([]);
        
    const fetchTargetGroups = () => {
        Api.targetGroup.get()
        .then(res => setTargetGroups(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchTargetGroups, []);

    return (
        <GroupContext.Provider 
            value={{ targetGroups, fetchTargetGroups }}
        >
            { children }
        </GroupContext.Provider>
    );    
}

export const useGroupContext = () => useContext(GroupContext);