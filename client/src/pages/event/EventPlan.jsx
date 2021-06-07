import React, { useState } from 'react';
import moment from 'moment';

import CalendarContainer from './CalendarContainer';
import EventPlanModalContainer from './EventPlanModalContainer';
import setCalendar, { currentYear, currentMonth } from 'utils/setCalendar';
import { useTracked } from 'context';
import Api from 'api';
import { clientSocket } from 'utils';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const fetchActivityPlans = async dispatch => {
    const activityPlans = await Api.activityPlan.get();
    const activitySchedule = await Api.activitySchedule.get();
    dispatch({
        type: "addActivityPlans",
        payload: activityPlans
    });

    const eventsDataMap = {activityPlans, activitySchedule};
    for (const event in eventsDataMap) {
        clientSocket.emit(event, eventsDataMap[event]);
    }
};

export default function EventPlan() {
    const calendar = setCalendar(currentMonth, currentYear);
    const [state, setState] = useState({ 
        currentMonth, currentYear, 
        monthData: calendar.monthData,
        monthTitle: calendar.monthTitle,
        load: false
    });
    
    const handleNext = () => {
        const currentYear = state.currentMonth === 11 ? 
            state.currentYear + 1 : state.currentYear;

        const currentMonth = (state.currentMonth + 1) % 12;
        const calendar = setCalendar(currentMonth, currentYear);
        setState(prev => ({
            ...prev, currentMonth, currentYear,
            monthData: calendar.monthData,
            monthTitle: calendar.monthTitle,
            load: !prev.load 
        }));
    };

    const handleBack = () => {
        const currentYear = state.currentMonth === 0 ? 
            state.currentYear-1 : state.currentYear;

        if (currentYear < 2020) return;
        const currentMonth = state.currentMonth === 0 ? 
            11 : state.currentMonth - 1
        
        const calendar = setCalendar(currentMonth, currentYear);
        setState(prev => ({
            ...prev, currentMonth, currentYear, 
            monthData: calendar.monthData,
            monthTitle: calendar.monthTitle,
            load: !prev.load
        }));
    };

    const onChangeMonth = month => {
        const calendar = setCalendar(month, state.currentYear);
        setState(prev => ({
            ...prev, 
            monthData: calendar.monthData,
            monthTitle: calendar.monthTitle,
            currentMonth: month,
            load: !prev.load
        }));
    };

    const onChangeYear = year => {
        const calendar = setCalendar(state.currentMonth, year);
        setState(prev => ({
            ...prev, 
            monthData: calendar.monthData,
            monthTitle: calendar.monthTitle,
            currentYear: year,
            load: !prev.load
        }));
    };

    const [store, dispatch] = useTracked();
    const isPlan = day => {
        const { currentMonth, currentYear } = state;
        let confirm = false;
        for (const plan of store.activityPlans) {
            const { planEvents } = plan;
            for (const event of planEvents) {
                const { date } = event;
                const d = new Date(date);
                const planYear = d.getFullYear();
                const planMonth = d.getMonth();
                const planDay = d.getDate();
                const isCalendar = (
                    planYear === currentYear && 
                    planMonth === currentMonth && 
                    planDay === day
                );
                if (isCalendar) return confirm = true;
            }
        }
        return confirm;
    };

    const tableView = {};
    const onExport = () => {
        const tableDom = tableView.current;
        const tableHeader = tableDom.getElementsByTagName('th');
        const tableHeaderText = [...tableHeader].map(el => ({
            text: el.textContent, style: 'tableHeader', bold: true,
        }));
        const tableRow = tableDom.getElementsByTagName('td');
        const tableRowCells = (
            [...tableRow]
            .map(el => ({text: el.textContent, style: 'tableData'}))
            .filter(val => {
                if (!val.text) {
                    val.text = 'Executed';
                    val.style = 'tableData';
                }
                return val.text !== 'Action';
            })
        );
        
        const tableHeaderRow = tableHeaderText.filter(val => val.text !== 'Action');

        const tableDataAsRows = tableRowCells.reduce((rows, cellData, index) => {
            if (index % 6 === 0) rows.push([]);
            rows[rows.length - 1].push(cellData);
            return rows;
        }, []);

        const tableBody = [
            tableHeaderRow,
            ...tableDataAsRows,
        ];
        // console.log(tableBody);

        // Document definition
        const dd = {
            header: { 
                text: `Activity Plan: ${dataSource.eventDate}`, 
                alignment: 'center' 
            },
            footer: (currentPage, pageCount) => ({ 
                text: `Page ${dataSource.page} of ${dataSource.pageCount}`,
                alignment: 'center' 
            }), 
            pageOrientation: 'landscape',
            content: [
                {
                    style: 'tableExample',
                    table: { headerRows: 1, body: tableBody },
                    layout: {
                        fillColor: (rowIndex) => {
                            if (rowIndex === 0) return '#0f4871';
                            return (rowIndex % 2 === 0) ? '#f2f2f2' : null;
                        }
                    }
                }
            ],
            styles: {
                tableExample: { margin: 5 },
                tableHeader: { margin: 5, color: 'white' },
                tableData: { margin: 5 }
            }
        };
        // pdfMake.createPdf(dd).download('Activity_Plan');
        pdfMake.createPdf(dd).open();
    };

    // modal logic
    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState({
        plans: [], eventDate: ''
    });

    const showModal = day => {
        setVisible(true);
        const { currentMonth, currentYear } = state;
        const d = new Date(currentYear, currentMonth, day);
        const calendarDate = moment(d).format('YYYY-MM-DD');    

        const plans = [];
        let eventDate = '';
        for (const plan of store.activityPlans) {
            const { planEvents } = plan;
            for (const event of planEvents) {
                if (calendarDate === event.date) {
                    eventDate = event.date;
                    plans.push(plan);
                }
            }
        }
        setDataSource(prev => ({...prev, plans, eventDate }));
    };

    const calendarProps = {
        state, handleNext, handleBack, isPlan,
        onChangeMonth, onChangeYear, showModal,
    };
    
    const modalProps = {
        visible, setVisible, onExport, store,
        activityPlans: dataSource.plans,
        eventDate: dataSource.eventDate,
        fetchActivityPlans: () => fetchActivityPlans(dispatch)
    };
    
    return (
        <>
            <CalendarContainer {...calendarProps} />
            <EventPlanModalContainer {...modalProps} />
        </>
    );
}