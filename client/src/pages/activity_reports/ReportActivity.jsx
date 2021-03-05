import React, { useState } from 'react';
import { Card, Table, Button } from 'antd';
// import UrlPattern from 'url-pattern';
// import { Path } from 'routes';
import ReportModal from './ReportModal';

export default function ReportActivity({ history }) {
    // const viewReport = key => {
    //     const pattern = new UrlPattern(Path.reportView());
    //     const path = pattern.stringify({ activityId: key });
    //     history.push(path);
    // };

    const [visible, setVisible] = useState(false);
    const viewReport = key => {
        setVisible(true);
    }

    return (
        <Card
            title='Report Activities'
            bordered={false}
        >
            <ReportModal 
                visible={visible}
                setVisible={setVisible}

            />

            <Table 
                dataSource={[
                    {
                        key: 1,
                        activity: 'Counseling and legal support',
                    },
                    {
                        key: 2,
                        activity: 'Self-help groups establishment',
                    },
                    {
                        key: 3,
                        activity: 'Baseline survey and focus group discussions',
                    }
                ]}
                columns={[
                    {
                        title: 'Activity',
                        dataIndex: 'activity',
                        key: 'activity'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (text, {key}) => {
                            return (
                                <Button type='link' onClick={() => viewReport(key)}>
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