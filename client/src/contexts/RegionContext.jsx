import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

const RegionContext = createContext(null);

export default function RegionProvider({ children }) {
    const [regions, setRegions] = useState([]);
    
    const fetchRegions = () => {
        Api.targetRegion.get()
        .then(res => setRegions(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchRegions, []);

    return (
        <RegionContext.Provider 
            value={{ regions, fetchRegions }}
        >
            { children }
        </RegionContext.Provider>
    );    
}

export const useRegionContext = () => useContext(RegionContext);