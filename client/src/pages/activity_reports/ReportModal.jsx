import React from 'react';
import { Modal, Table } from 'antd';

export default function ReportModal({visible, setVisible}) {
    
    return (
        <Modal
            title='Reports'
            visible={visible}
            // onOk={onOk}
            // okText='Save'           
            onCancel={() => setVisible(false)}
        >   
            <Table
                pagination={false}
                dataSource={[
                    {
                        key: 1,
                        report: 'report 1'
                    },
                    {
                        key: 2,
                        report: 'report 2'
                    }
                ]}

                columns={[
                    {
                        title: 'Report',
                        dataIndex: 'report',
                        key: 'report'
                    }
                ]}
            />
        </Modal>
    );
}