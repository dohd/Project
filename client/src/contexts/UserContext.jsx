import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
        
    const fetchUsers = () => {
        Api.user.get()
        .then(res => setUsers(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchUsers, []);

    useEffect(() => {
        if (users.length) sessionStorage.user_state = 'true';
        if (!users.length) sessionStorage.removeItem('user_state');
    } ,[users]);

    return (
        <UserContext.Provider 
            value={{ users, fetchUsers }}
        >
            { children }
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
};