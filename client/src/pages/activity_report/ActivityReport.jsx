import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import ResponseModal from './ResponseModal';
import ImageModal from './ImageModal';
import { parseUrl } from 'utils';
import { Path } from 'routes';
import { useTracked } from 'context';

export default function ActivityReport() {
    const store = useTracked()[0];
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const activityMap = store.narratives.reduce((r,c) => {
            const key = c.activity.id;
            if (!r[key]) r[key] = { key, activity: c.activity.action };
            return r;
        }, {});
        const list = Object.values(activityMap);
        setActivities(list);
    }, [store.narratives]);

    // modal logic
    const [record, setRecord] = useState([]);
    const [visible, setVisible] = useState({
        response: false, image: false
    });
    const showResponseModal = key => {
        setVisible(prev => ({...prev, response: true}));
        const list = store.narratives.filter(v => v.activity.id === key);
        const reports = list.map(v => ({ key: v.id, report: v.title }));
        setRecord(reports);
    };
    const showImageModal = key => {
        setVisible(prev => ({...prev, image: true}));
        const list = store.narratives.filter(v => v.activity.id === key);
        const reports = list.map(v => ({ key: v.id, report: v.title }));
        setRecord(reports);
    };

    return (
        <Card
            title='Activity Reports'
            bordered={false}
        >
            <ResponseModal 
                visible={visible.response}
                setVisible={setVisible}
                record={record}
            />

            <ImageModal 
                visible={visible.image}
                setVisible={setVisible}
                record={record}
            />

            <Table 
                dataSource={activities}
                columns={[
                    {
                        title: 'Activity',
                        dataIndex: 'activity',
                        key: 'activity'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (txt, {key}) => {
                            const params = { activityId: key };
                            const casePath = parseUrl(Path.caseStudies(), params);
                            return (
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item onClick={() => showResponseModal(key)}>
                                                Responses
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link to={casePath}>Case studies</Link>
                                            </Menu.Item>
                                            <Menu.Item onClick={() => showImageModal(key)}>
                                                Images
                                            </Menu.Item>
                                        </Menu>
                                    }
                                >
                                    <Button type='link'>
                                        narrative report <DownOutlined />
                                    </Button>
                                </Dropdown>
                            );
                        }
                    }
                ]}
            />
        </Card>
    );
}