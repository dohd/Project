import React, { useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';

import { Auth } from 'api';
import { Path } from 'routes';

export default function Logout() {
    const [isLoggedOut, setLoggedOut] = useState(false);

    const toggleLogout = () => {
        Auth.logout();
        setLoggedOut(true);
    };

    return (
        isLoggedOut ? <Redirect to={Path.login} /> :
        <LogoutOutlined 
            onClick={toggleLogout} 
            className='logout-icon' 
            style={{
                color: "white",
                fontSize: "1.4em",
                display: "inline-block"
            }}
        />
    );
}