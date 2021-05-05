import React, { useEffect, useState } from 'react';
import { Upload } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';

import './changeAvatar.css';
import Api, {fetchAud} from 'api';
import { useTracked } from 'context';
import uploadTask from 'utils/firebaseConfig';

const fetchProfileImage = dispatch => {
    Api.profileImage.get()
    .then(res => dispatch({
        type: 'addProfileImage', 
        payload: res
    }));
};

export default function ChangeAvatar(params) {
    const [store, dispatch] = useTracked();

    const [loading, setLoading] = useState(false);

    const upload = async file => {
        try {
            const url = await uploadTask(`/profile/${file.name}`, file);
            const res = await Api.profileImage.post({url});
            if (res) fetchProfileImage(dispatch);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleBeforeUpload = file => {
        const name = 'image-' + fetchAud();
        const ren_file = new File([file], name, {type: file.type});

        setLoading(true);
        upload(ren_file);
        return false;
    };

    const [url, setUrl] = useState('');
    useEffect(() => setUrl(store.profileImage.url), [store.profileImage]);

    const profileStatus = () => {
        if (loading) return <LoadingOutlined />;
        else if (url) {
            return (
                <img 
                    src={url} 
                    alt='event' 
                    style={{ width: '100%' }} 
                />
            );
        }
        else return (
            <div>
                <UploadOutlined className='settings-upload-outlined' />
                <p className='settings-upload'>Upload</p>
            </div>
        );
    }

    return (
        <div className='settings-avatar-container'>
            <div style={{ width: '9em' }}>
                <Upload
                    beforeUpload={handleBeforeUpload}
                    showUploadList={false}
                    listType='picture-card'
                >
                    { profileStatus() }
                </Upload>
            </div>

            <div className='settings-avatar-content'>
                <h3>Change Profile</h3>  
                <p className='settings-paragraph'>
                    Change organisation profile picture
                </p>
            </div>
        </div>
    );
}