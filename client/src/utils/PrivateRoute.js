import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Path } from 'routes';

export default function PrivateRoute({component, ...props}) {
    const auth = sessionStorage.getItem('token');
    if (!auth) return <Redirect to={Path.login()} />;
    return <Route {...props} component={component} />;
}