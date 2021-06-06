import React, { useState } from 'react';

import { Auth } from 'api';
import { Path } from 'routes';
import Login from './Login';

export default function LoginContainer({ history }) {
    const [isLoading, setLoading] = useState(false);

    const onFinish = values => {
        setLoading(true);
        Auth.login(values)
        .then(res => res && history.push(Path.home))
        .catch(err => setLoading(false));
    };
    const onFinishFailed = err => console.log('Error:', err);

    const props = { onFinish, onFinishFailed, isLoading };
    return <Login {...props} />;
}