import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useTracked } from 'context'

export default function AvatarProfile() {
    const store = useTracked()[0];
    return (
        <Avatar
            size='large'
            style={{ 
                height: '3.5em', 
                width: '3.5em', 
                marginLeft: 'auto', 
                marginRight: 'auto' 
            }}
            icon={
                store.avatarImage ?
                <div> 
                    <img 
                        src={store.avatarImage} 
                        alt='avatar' 
                        style={{ 
                            width: '100%', 
                            height: '3.5em',
                            objectFit: 'fill' 
                        }} 
                    /> 
                </div> : 
                <UserOutlined 
                    style={{ 
                        fontSize: '2em', 
                        marginTop: '.3em' 
                    }}
                />
            }
        />
    );
}