import React, { useRef, useEffect } from 'react';

import Calendar from './Calendar';

export default function CalendarContainer(props) {
    const { state, isPlan, showModal } = props;

    const tableView = useRef();
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
    }, [state.load, tableView, isPlan, showModal]);

    const params = {tableView, ...props};
    return <Calendar {...params} />;
}