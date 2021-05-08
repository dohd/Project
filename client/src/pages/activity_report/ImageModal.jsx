import React from 'react';
import { Modal, Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import { parseUrl } from 'utils';
import { Path } from 'routes';

export default function ImageModal(props) {
    const {visible, setVisible, record } = props;
    const onCancel = () => setVisible(prev => ({
        ...prev, image: false
    }));
    
    return (
        <Modal
            title='Reports'
            visible={visible}
            okButtonProps={{ disabled: true }}
            onCancel={onCancel}
        >   
            <Table
                pagination={false}
                dataSource={record}
                columns={[
                    {   
                        title: 'Report',
                        dataIndex: 'report',
                        key: 'report'
                    },
                    {
                        title: 'Image',
                        key: 'image',
                        render: (txt, {key}) => {
                            const params = { narrativeReportId: key };
                            const imagePath = parseUrl(Path.reportImages, params);
                            return (
                                <Button type='link'>
                                    <Link to={imagePath}>images</Link>
                                </Button>
                            );
                        }
                    }
                ]}
            />
        </Modal>
    );
}