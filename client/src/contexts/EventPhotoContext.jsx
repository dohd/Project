import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

const EventPhotoContext = createContext(null);

export default function EventPhotoProvider({ children }) {
    const [eventPhotos, setEventPhotos] = useState([]);
        
    const fetchEventPhotos = () => {
        Api.eventImage.get()
        .then(res => setEventPhotos(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchEventPhotos, []);

    return (
        <EventPhotoContext.Provider 
            value={{ eventPhotos, fetchEventPhotos }}
        >
            { children }
        </EventPhotoContext.Provider>
    );
}

export const useEventPhotoContext = () => useContext(EventPhotoContext);
