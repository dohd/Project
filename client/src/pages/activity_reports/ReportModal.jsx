import React from 'react';
import { Modal, Table, Button } from 'antd';

export default function ReportModal(props) {
    const {visible, setVisible, viewTable } = props;
    return (
        <Modal
            title='Reports'
            visible={visible}
            okButtonProps={{ disabled: true }}
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
                        key: 'report',
                        align: 'center',
                        render: (text, {key}) => (
                            <Button type='link' onClick={() => viewTable(key)}>
                                {text}
                            </Button>
                        )
                    }
                ]}
            />
        </Modal>
    );
}