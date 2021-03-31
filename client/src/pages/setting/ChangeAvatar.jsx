import React from 'react';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Api, { endpoints, fetchToken } from 'api';
import { useTracked } from 'context';
import './changeAvatar.css';

const fetchAvatarImage = dispatch => {
    Api.avatarImage.get()
    .then(res => dispatch({
        type: 'addAvatarImage', 
        payload: res
    }));
};

export default function ChangeAvatar(params) {
    const [store, dispatch] = useTracked();

    const handleChange = e => {
        const { status, response } = e.file;
        if (status === 'done') fetchAvatarImage(dispatch);
        if (status === 'error' && response.error) {
            console.log(response.error);
            if (response.error.message) {
                message.error(response.error.message);
            }
        }
    };

    const token = fetchToken();
    const actionUrl = endpoints.avatarImage;
    const uploadName = 'profile';

    return (
        <div className='settings-avatar-container'>
            <div style={{ width: '9em' }}>
                <Upload
                    name={uploadName}
                    action={actionUrl}
                    headers={{ authorization: `Bearer ${token}` }}
                    accept='image/jpg, image/png, image/jpeg'
                    showUploadList={false}
                    listType= 'picture-card'
                    onChange={handleChange}
                >
                    { 
                        store.avatarImage ? 
                        <img 
                            src={store.avatarImage} 
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