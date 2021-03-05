import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

const RoleContext = createContext(null);

export default function RoleProvider({ children }) {
    const [roles, setRoles] = useState([]);
    
    const fetchRoles = () => {
        Api.role.get()
        .then(res => setRoles(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchRoles, []);

    return (
        <RoleContext.Provider 
            value={{ roles, fetchRoles }}
        >
            { children }
        </RoleContext.Provider>
    );
}

export const useRoleContext = () => useContext(RoleContext);
