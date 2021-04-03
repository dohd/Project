import React, { useState } from 'react';
import { Card, Table, Button } from 'antd';

import ReportModal from './ReportModal';

export default function ReportActivity({ history }) {    

    const [visible, setVisible] = useState(false);
    const [record, setRecord] = useState({});
    const viewReport = record => {
        setVisible(true);
        setRecord(record);
    }

    return (
        <Card
            title='Report Activities'
            bordered={false}
        >
            <ReportModal 
                visible={visible}
                setVisible={setVisible}
                record={record}
            />

            <Table 
                // dataSource={activities}
                columns={[
                    {
                        title: 'Activity',
                        dataIndex: 'action',
                        key: 'activity'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (text, record) => {
                            return (
                                <Button type='link' onClick={() => viewReport(record)}>
                                    reports
                                </Button>
                            );
                        }
                    }
                ]}

            />
        </Card>
    );
}