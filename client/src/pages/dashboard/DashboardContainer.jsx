import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Dashboard from './Dashboard';
import RouteResolver, { RouteNameMap } from 'routes';
import { useOrgProfileContext } from 'contexts';

export default function DashboardContainer({ location }) {
    const { orgProfile, fetchOrgProfile } = useOrgProfileContext();
    useEffect(fetchOrgProfile, []);

    const [name, setName] = useState('');
    useEffect(() => {
        if (Object.keys(orgProfile).length) {
            setName(orgProfile.detail.name)
        }
    }, [orgProfile]);

    const [auth, setAuth] = useState(false);
    useEffect(() => {
        const payload = jwt_decode(sessionStorage.getItem('token'));
        const isAuth = payload.roleId === 1;
        setAuth(isAuth);
    }, []);
        
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
            breadcrumbItems={breadcrumbItems}
            auth={auth}
        />
    );
}
