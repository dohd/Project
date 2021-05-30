import React from 'react';
import { Card, Table, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import ResponseModal from './ResponseModal';
import ImageModal from './ImageModal';
import { parseUrl } from 'utils';
import { Path } from 'routes';

export default function ActivityReport(props) {
    const {
        visible, setVisible, record, 
        activities, showResponseModal,
        showImageModal
    } = props;
    
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
                            const casePath = parseUrl(Path.caseStudies, params);
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