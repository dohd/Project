import React from 'react';
import { Card, Table, Select, Space } from 'antd';
import { LeftOutlined, RightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import './calendar.css';
import { months, years, days } from 'utils/setCalendar';

export default function Calendar(props) {
    const {
        state, tableView, handleBack, handleNext,
        onChangeMonth, onChangeYear
    } = props;
    const history = useHistory();

    const monthList = months.map((val, i) => {
        const shortName = val.slice(0, 3);
        return (
            <Select.Option key={val} value={i}>
                { shortName }
            </Select.Option>
        );
    });

    const yearList = years.map(val => (
        <Select.Option key={val} value={val}>
            { val }
        </Select.Option>
    ));
    return (
        <Card
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()}
                        style={{fontSize: '18px'}} 
                    />                       
                    Event Calendar
                </Space>   
            }
            bordered={false}
        >
            <div className='calendar-header'>
                <LeftOutlined 
                    className='outline-icon' 
                    onClick={handleBack}
                />
                <h3>{ `${state.monthTitle.month}, ${state.monthTitle.year}` }</h3>
                <RightOutlined
                    className='outline-icon' 
                    onClick={handleNext}
                />
            </div>

            <div className='jump-to'>
                <h3>Jump to:</h3>
                <Select
                    className='select-drop'
                    defaultValue={state.currentMonth}
                    onChange={onChangeMonth}
                >
                    { monthList }
                </Select>
                <Select
                    className='select-drop'
                    defaultValue={state.currentYear}
                    onChange={onChangeYear}
                >
                    { yearList }
                </Select>
            </div>

            <div ref={tableView}>
                <Table
                    bordered
                    className='calendar-table'
                    dataSource={state.monthData}
                    pagination={{ hideOnSinglePage: true }}
                    columns={
                        days.map(name => {
                            const char = name.charAt(0);
                            const title = name.replace(char, char.toUpperCase());
                            return { 
                                title, 
                                dataIndex: name, 
                                key: name,
                                align: 'center',
                            };
                        })
                    }
                />
            </div>
        </Card>
    );
}