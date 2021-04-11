import React from 'react';
import { Modal, Table } from 'antd';

export default function ViewModal(props) {
    const { visible, setVisible, record } = props;
    return (
        <Modal
            title='Narrative Report Track'
            visible={visible}
            okText='Done'
            onCancel={() => setVisible(false)}
            okButtonProps={{ disabled: true }}
            cancelButtonProps={{ disabled: true }}
        >
            <Table
                dataSource={record}
                columns={[
                    {
                        title: 'Activity',
                        dataIndex: 'activity',
                        key: 'activity',
                    },
                    {
                        title: 'Response',
                        dataIndex: 'response',
                        key: 'response',
                    }
                ]}
            />
        </Modal>        
    );
}