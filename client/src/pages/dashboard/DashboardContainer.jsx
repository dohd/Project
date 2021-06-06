import React, { useEffect, useState } from 'react';

import Dashboard from './Dashboard';
import RouteResolver from 'routes';
import { 
    useTracked, 
    fetchResources, 
    socketUpdateResources 
} from 'context';
import { clientSocket } from 'utils';

export default function DashboardContainer({ location }) {
    const [store, dispatch] = useTracked();
    useEffect(() => fetchResources(dispatch), [dispatch]);
    useEffect(() => { 
        clientSocket.init();
        socketUpdateResources(dispatch);
    }, [dispatch]);

    const [state, setState] = useState({
        name: '',
        imageUrl: ''
    });

    const { profileImage, orgProfile } = store;
    useEffect(() => {
        setState(prev => ({
            ...prev, imageUrl: profileImage.url
        }));

        const name = orgProfile.detail?.name;
        if (name) setState(prev => ({...prev, name}));
    }, [orgProfile, profileImage]);
        
    const [routePaths, setRoutePaths] = useState([]);
    useEffect(() => {
        const urls = RouteResolver(location.pathname);
        setRoutePaths(urls)
    }, [location.pathname]);

    const props = {
        routePaths,
        profileName: state.name,
        profileImage: state.imageUrl
    };    
    return <Dashboard {...props} />;
}
