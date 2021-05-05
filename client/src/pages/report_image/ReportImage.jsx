import React from 'react';
import { Button, Card, Space, Upload, Image } from 'antd';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

export default function ReportImage(props) {
    const { handleBeforeUpload, loading, eventImages } = props;
    const history = useHistory();

    const ImageList = eventImages.map(v => (
        <Image key={v.id} width={200} src={v.url} alt='image' />
    ));

    return (
        <Card
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()}
                        style={{fontSize: '18px'}} 
                    />                       
                    Report
                </Space>  
            }
            extra={
                <Upload multiple
                    beforeUpload={handleBeforeUpload}
                    showUploadList={false}
                >
                    <Button
                        icon={<UploadOutlined /> }
                        loading={loading}
                    >
                        Upload Image
                    </Button>
                </Upload>
            }
        >
            <Image.PreviewGroup>
                { ImageList }
            </Image.PreviewGroup>
        </Card>
    );
}