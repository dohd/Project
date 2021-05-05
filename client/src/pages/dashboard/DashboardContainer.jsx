import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import Dashboard from './Dashboard';
import RouteResolver, { RouteNameMap } from 'routes';
import { useTracked, fetchResources } from 'context';

export default function DashboardContainer({ location }) {
    const [store, dispatch] = useTracked();
    useEffect(() => fetchResources(dispatch), [dispatch]);

    const [name, setName] = useState('');
    useEffect(() => {
        const profile = store.orgProfile;
        if (profile.hasOwnProperty('detail')) {
            setName(profile.detail.name);
        }
    }, [store.orgProfile]);

    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
        setProfileImage(store.profileImage.url);
    }, [store.profileImage]);
        
    const [routePaths, setRoutePaths] = useState([]);
    useEffect(() => {
        const urls = RouteResolver(location.pathname);
        setRoutePaths(urls)
    }, [location.pathname]);

    const breadcrumbItems = routePaths.map((url,i,arr) => {
        const last = arr.indexOf(url) === arr.length - 1;
        return (
            <Breadcrumb.Item key={url}>
                { 
                    last ? <span>{ RouteNameMap[url] }</span> :
                    <Link to={url}>{ RouteNameMap[url] }</Link> 
                }
            </Breadcrumb.Item>
        );
    }); 
    
    return (
        <Dashboard
            profileName={name}
            profileImage={profileImage}
            breadcrumbItems={breadcrumbItems}
        />
    );
}
