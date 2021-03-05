import React, { createContext, useState, useContext } from 'react';
import Api from 'api';

const OrgProfileContext = createContext(null);

export default function OrgProfileProvider({ children }) {
    const [orgProfile, setOrgProfile] = useState({});
    
    const fetchOrgProfile = () => {
        if (!sessionStorage.getItem('token')) return;
        Api.orgProfile.get()
        .then(res => setOrgProfile(res))
        .catch(err => console.log(err));
    };

    return (
        <OrgProfileContext.Provider 
            value={{ orgProfile, fetchOrgProfile }}
        >
            { children }
        </OrgProfileContext.Provider>
    );
}

export const useOrgProfileContext = () => useContext(OrgProfileContext);
