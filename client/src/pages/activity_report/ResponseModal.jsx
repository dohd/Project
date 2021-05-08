import React from 'react';
import { Modal, Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import { Path } from 'routes';
import { parseUrl } from 'utils';

export default function ResponseModal(props) {
    const {visible, setVisible, record } = props;
    const onCancel = () => setVisible(prev => ({
        ...prev, response: false
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
                        title: 'Response',
                        key: 'response',
                        render: (txt, {key}) => {
                            const params = { narrativeReportId: key };
                            const resPath = parseUrl(Path.reportResponses, params);
                            return (
                                <Button type='link'>
                                    <Link to={resPath}>responses</Link>
                                </Button>
                            );
                        }
                    }
                ]}
            />
        </Modal>
    );
}