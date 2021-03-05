import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAvatarContext } from 'contexts';
import { endpoints } from 'api';
import './changeAvatar.css';

export default function ChangeAvatar(params) {
    const actionUrl = endpoints.profilePhoto;
    const uploadName = 'profile';

    const [state, setState] = useState({ imageUrl: null, token: ''});
    const { imageUrl, fetchAvatar } = useAvatarContext();
    useEffect(() => setState(prev => ({...prev, imageUrl})), [imageUrl]);
    useEffect(() => {
        const token =  sessionStorage.getItem('token');
        setState(prev => ({...prev, token}));
    }, []);

    const handleChange = e => {
        const { status, response } = e.file;
        if (status === 'done') fetchAvatar();
        if (status === 'error' && response.error) {
            console.log(response.error);
            if (response.error.message) {
                message.error(response.error.message);
            }
        }
    };

    return (
        <div className='settings-avatar-container'>
            <div style={{ width: '9em' }}>
                <Upload
                    name={uploadName}
                    action={actionUrl}
                    headers={{ authorization: 'Bearer ' + state.token }}
                    accept='image/jpg, image/png, image/jpeg'
                    showUploadList={false}
                    listType= 'picture-card'
                    onChange={handleChange}
                >
                    { 
                        state.imageUrl ? 
                        <img 
                            src={state.imageUrl} 
                            alt='avatar' 
                            style={{ width: '100%' }} 
                        /> : 
                        <div>
                            <UploadOutlined className='settings-upload-outlined' />
                            <p className='settings-upload'>Upload</p>
                        </div>
                    }
                </Upload>
            </div>

            <div className='settings-avatar-content'>
                <h3>Change Avatar</h3>  
                <p className='settings-paragraph'>
                    Change organisation profile picture
                </p>
            </div>
        </div>
    );
}
