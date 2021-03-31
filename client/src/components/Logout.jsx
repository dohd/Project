import React, { useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';

import Api from 'api';
import { Path } from 'routes';
import { eraseToken } from 'api';

export default function Logout() {
    const [isLogOut, setLogOut] = useState(false);
    const toggleLogout = () => {
        Api.logout.delete()
        eraseToken();
        setLogOut(true);
    };
    return (
        isLogOut ? <Redirect to={Path.login()} /> :
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