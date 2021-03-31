import React, { createContext, useState, useContext } from 'react';
import Api from 'api';

const AvatarContext = createContext(null);

export default function AvatarProvider({ children }) {
    const [imageUrl, setImageUrl] = useState('');

    const fetchAvatar = () => {
        if (!sessionStorage.getItem('token')) return; 
        Api.avatarImage.get()
        .then(res => setImageUrl(res))
        .catch(err => console.log(err));
    };
    
    return (
        <AvatarContext.Provider 
            value={{ imageUrl, fetchAvatar }}
        >
            { children }
        </AvatarContext.Provider>
    );
}

export const useAvatarContext = () => useContext(AvatarContext);
