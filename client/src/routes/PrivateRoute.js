import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Path from './routes';
import { isAuth } from 'api';

export default function PrivateRoute({component, ...props}) {
    if (!isAuth()) return <Redirect to={Path.login} />;
    return <Route {...props} component={component} />;
}