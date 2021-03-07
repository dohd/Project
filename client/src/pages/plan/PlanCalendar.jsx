import React, { useRef, useEffect } from 'react';
import { Card, Table, Select, Space } from 'antd';
import { LeftOutlined, RightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import './calendar.css';
import { months, years, days } from './showCalendar';

export default function PlanCalendar(props) {
    const { 
        state, handleNext, handleBack, isPlan,
        onChangeMonth, onChangeYear, showModal,
        history
    } = props;

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

    const tableView = useRef();
    const load = state.load;
    useEffect(() => {
        const table = tableView.current
        const tableRows = table.getElementsByTagName('tr');
        [...tableRows].forEach(row => {
            const rowCells = row.cells;
            [...rowCells].forEach(cell => {
                const value = Number(cell.innerText);
                if (isPlan(value)) {
                    cell.classList.add('plan-cell');
                    const ant_class = [...row.classList];
                    cell.onclick = function () { showModal(value) };
                    row.onmouseover = function () {
                        row.classList.remove(...ant_class);
                    }
                    row.onmouseout = function () {
                        row.classList.add(...ant_class);
                    }
                } else {
                    cell.classList.remove('plan-cell');
                }
            });
        });
    }, [tableView, load, isPlan, showModal]);

    return (
        <Card
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()}
                        style={{fontSize: '18px'}} 
                    />                       
                    Activity Plan
                </Space>   
            }
            bordered={false}
        >
            <div className='calendar-header'>
                <LeftOutlined 
                    className='outline-icon' 
                    onClick={handleBack}
                />
                <h3>{ `${state.title.month}, ${state.title.year}` }</h3>
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
                    dataSource={state.singleMonth}
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