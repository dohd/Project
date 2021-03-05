import React, { useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import Api from 'api';
import { Path } from 'routes';

export default function Logout(props) {
    const [state, setState] = useState(false);
    const onLogout = () => {
        Api.logout.delete()
        .catch(err => {
            if (err.message && err.status !== 401) {
                console.log(err);
            }
        });
        setState(true);
        sessionStorage.clear();
    };

    return (
        state ? <Redirect to={Path.login()} /> :
        <LogoutOutlined 
            onClick={onLogout} 
            className='logout-icon' 
            style={{
                color: "white",
                fontSize: "1.4em",
                display: "inline-block"
            }}
        />
    );
}