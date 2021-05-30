import React, { useState } from 'react';

import Api, { setToken, isAuth } from 'api';
import { Path } from 'routes';
import Login from './Login';

export default function LoginContainer({ history }) {
    const [isLoading, setLoading] = useState(false);

    const loginAuth = async data => {
        try {
            const res = await Api.login.post(data);
            setToken(res.accessToken);
            return isAuth() && history.push(Path.home);
        } catch (error) {
            setLoading(false);
        }
    };

    const onFinish = values => {
        setLoading(true);
        loginAuth(values);
    };
    const onFinishFailed = err => console.log('Error:', err);

    const props = { onFinish, onFinishFailed, isLoading };
    return <Login {...props} />;
}