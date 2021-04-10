import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function AvatarProfile({profileImage}) {
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
                profileImage ?
                <div> 
                    <img 
                        src={profileImage} 
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
