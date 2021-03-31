import React, { useState,useEffect } from 'react';
import { Card, Upload, Modal, Space, message } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useEventPhotoContext } from 'contexts';
import Api, { endpoints } from 'api';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default function EventPhoto({ history, location }) {
    const { reportId } = location.state;
    const actionUrl = `${endpoints.eventPhoto}/${reportId}`;
    const uploadName = 'event_photo';

    const [state, setState] = useState({
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        isLoading: true,
        token: '',
    });
    
    const { eventPhotos, fetchEventPhotos } = useEventPhotoContext();
    useEffect(() => {
        let fileList = [];
        for (const report of eventPhotos) {
            if (report.id === Number(reportId)) {
                const { eventPhotos } = report;
                fileList = eventPhotos.map(photo => ({
                    uid: photo.id,
                    name: photo.name, 
                    url: photo.imageUrl,
                }));
                break;
            }
        }
        setState(prev => ({...prev, isLoading: false, fileList}));
    }, [eventPhotos, reportId]);

    useEffect(() => {
        const token =  sessionStorage.getItem('token');
        setState(prev => ({...prev, token}));
    }, []);

    const handleCancel = () => setState(prev => ({
        ...prev, previewVisible: false
    }));

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setState(prev => ({
            ...prev,
            previewVisible: true,
            previewImage: file.url || file.preview,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),   
        }));
    };

    const handleChange = e => {
        const { status, response } = e.file;
        setState(prev => ({...prev, fileList: e.fileList }));
        if (status === 'done') fetchEventPhotos();
        if (status === 'error' && response.error) {
            console.log(response.error);
            if (response.error.message) {
                message.error(response.error.message);
            }
        }
    };

    const handleRemove = file => {
        const res = window.confirm('Sure to delete this image?')
        if (res) {
            const fileList = [...state.fileList];
            const index = fileList.indexOf(file);
            fileList.splice(index, 1);
            setState(prev => ({...prev, fileList}));
            Api.eventImage.delete(file.uid)
            .then(res => {
                fetchEventPhotos();
                message.success('Photo successfully deleted!');
            })
            .catch(err => {
                console.log(err);
                message.error('Unknown error!');
            });
        }
    };

    return (
        <Card
            title={
                <Space>
                    <ArrowLeftOutlined
                        onClick={() => history.goBack()}
                        style={{fontSize: '18px'}}
                    />
                    Event Photos
                </Space>
            }
        >
            <div className='event-photo-container'>
                <div className='event-photo-content'>
                    { 
                        state.isLoading ? 
                        <LoadingOutlined 
                            style={{ fontSize: '3em', marginLeft: '40%' }}
                        /> :
                        <Upload
                            name={uploadName}
                            action={actionUrl}
                            headers={{ authorization: `Bearer ${state.token}` }}
                            listType="picture-card"
                            fileList={state.fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            onRemove={handleRemove}
                        >
                            { 
                                state.fileList.length >= 10 ? null : 
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>
                                        Upload
                                    </div>
                                </div>
                            }
                        </Upload>
                    }

                    <Modal
                        visible={state.previewVisible}
                        title={state.previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img 
                            src={state.previewImage}
                            alt="event" 
                            style={{ width: '100%' }} 
                        />
                    </Modal>
                </div>
            </div>
        </Card>
    );
}
