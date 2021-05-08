import React from 'react';
import { Card, Table, Row, Col, Space, Tooltip } from 'antd';
import { 
    ProjectOutlined, TeamOutlined, ScheduleOutlined,
    EllipsisOutlined, FileDoneOutlined, CarryOutOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './home.css';

import { Path } from 'routes';

export default function Home(props) {
    const { donors, proposals, activity, schedule } = props;
    return (
        <Card
            bordered={false}
            className='home-card-container'
        >   
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} >
                    <div className='donors'>
                        <TeamOutlined className='category-icon' />
                        <p className='category-value'>{donors}</p>
                        <p className='category-label'>Donors</p>
                    </div>
                </Col>
                <Col xs={24} sm={12}>
                    <div className='narrative'>
                        <CarryOutOutlined className='category-icon' />
                        <p className='category-value'>{activity}</p>
                        <p className='category-label'>Activities Implemented</p>
                    </div>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} >
                    <div className='pending'>
                        <ProjectOutlined className='category-icon' />
                        <p className='category-value'>{proposals.pending}</p>
                        <p className='category-label'>Pending Proposals</p>
                    </div>
                    
                </Col>
                <Col xs={24} sm={12}>
                    <div className='approved'>
                        <FileDoneOutlined className='category-icon' />
                        <p className='category-value'>{proposals.approved}</p>
                        <p className='category-label'>Approved Proposals</p>
                    </div>
                </Col>
            </Row>

            <Card 
                style={{ marginTop: 10 }}
                bordered={false}
                title={
                    <Space>
                        <ScheduleOutlined />
                        Activity schedule
                    </Space>
                }
                extra={
                    <Link to={Path.eventCalendar}>
                        <Tooltip title='Event Calendar'>
                            <EllipsisOutlined style={{ fontSize: '2em' }} />
                        </Tooltip>
                    </Link>
                }
            >
                <Table 
                    dataSource={schedule}
                    columns={[
                        {
                            title: 'Activity',
                            dataIndex: 'activity',
                            key: 'activity'
                        },
                        {
                            title: 'Remaining Days',
                            dataIndex: 'days',
                            key: 'days',
                            className: 'days-col'
                        },
                        {
                            title: 'Implementation Date',
                            dataIndex: 'date',
                            key: 'date'
                        }
                    ]}
                />
            </Card>
        </Card>
    );
}