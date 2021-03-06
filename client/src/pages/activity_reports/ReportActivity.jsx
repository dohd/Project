import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'antd';
import UrlPattern from 'url-pattern';
import { Path } from 'routes';
import ReportModal from './ReportModal';
import { useNarrativeContext } from 'contexts';

export default function ReportActivity({ history }) {
    const [activities, setActivities] = useState([]);
    const { narratives } = useNarrativeContext();
    useEffect(() => { 
        const json_activities = narratives.map(val => JSON.stringify(val.activity));
        const unique_activities = Array.from(new Set(json_activities));
        const activityList = unique_activities.map(val => JSON.parse(val));        
        setActivities(activityList);
    }, [narratives]);

    const viewTable = key => {
        const pattern = new UrlPattern(Path.reportView());
        const path = pattern.stringify({ activityId: key });
        history.push(path);
    };

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
                viewTable={viewTable}
            />

            <Table 
                dataSource={activities}
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