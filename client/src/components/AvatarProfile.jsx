import React, { useEffect } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAvatarContext } from 'contexts';

export default function AvatarProfile(params) {
    const { imageUrl, fetchAvatar } = useAvatarContext();
    useEffect(fetchAvatar, []);

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
                imageUrl ?
                <div> 
                    <img 
                        src={imageUrl} 
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