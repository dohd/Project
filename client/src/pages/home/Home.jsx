import React from 'react';
import { Card, Table, Row, Col, Space } from 'antd';
import { 
    ProjectOutlined, TeamOutlined, ScheduleOutlined,
    EllipsisOutlined, FileDoneOutlined, CarryOutOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Path } from 'routes';
import './home.css';

export default function Home(params) {
    return (
        <Card
            bordered={false}
            className='home-card-container'
        >   
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} >
                    <div className='donors'>
                        <TeamOutlined className='category-icon' />
                        <p className='category-value'>5</p>
                        <p className='category-label'>Donors</p>
                    </div>
                </Col>
                <Col xs={24} sm={12}>
                    <div className='narrative'>
                        <CarryOutOutlined className='category-icon' />
                        <p className='category-value'>50</p>
                        <p className='category-label'>Activities Implemented</p>
                    </div>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} >
                    <div className='pending'>
                        <ProjectOutlined className='category-icon' />
                        <p className='category-value'>10</p>
                        <p className='category-label'>Pending Proposals</p>
                    </div>
                    
                </Col>
                <Col xs={24} sm={12}>
                    <div className='approved'>
                        <FileDoneOutlined className='category-icon' />
                        <p className='category-value'>20</p>
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
                    <Link to={Path.activityPlans()}>
                        <EllipsisOutlined style={{ fontSize: '2em' }} />
                    </Link>
                }
            >
                <Table 
                    dataSource={[
                        {
                            key: 1,
                            activity: 'Counseling and legal support',
                            days: 26,
                            date: '2021-03-10'
                        },
                        {
                            key: 2,
                            activity: 'Self-help groups establishment',
                            days: 9,
                            date: '2021-03-5'
                        },
                        {
                            key: 3,
                            activity: 'Baseline survey and focus group discussions',
                            days: 28,
                            date: '2021-03-12'
                        }
                    ]}
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