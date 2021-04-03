import React, { useState, useEffect } from "react";

import TargetGroups from './TargetGroups';
import Api from 'api';
import { useTracked } from "context";

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const fetchTargetGroups = dispatch => {
    Api.targetGroup.get()
    .then(res => dispatch({
        type: 'addTargetGroups',
        payload: res
    }));
}

export default function TargetGroupsContainer() {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({
        groups: [], record: {}
    });

    useEffect(() => {
        const groups = store.targetGroups.map(v => ({
            key: v.id, group: v.group
        }));
        setState(prev => ({...prev, groups }));
    }, [store.targetGroups]);

    const onDelete = key => {
        Api.targetGroup.delete(key)
        .then(res => fetchTargetGroups(dispatch));
    };

    const tableView = {};
    const onExport = () => {
        const tableDom = tableView.current;
        const tableHeader = tableDom.getElementsByTagName('th');
        const tableHeaderText = [...tableHeader].map(el => ({
            text: el.textContent, 
            style: 'tableHeader', 
            bold: true,
            // alignment: 'center'
        }));
        const tableRow = tableDom.getElementsByTagName('td');
        const tableRowCells = (
            [...tableRow]
            .map(el => ({text: el.textContent, style: 'tableData'}))
            .filter(val => val.text)
        );

        const tableHeaderRow = tableHeaderText.filter(val => val.text === 'Group');

        const tableDataAsRows = tableRowCells.reduce((rows, cellData, index) => {
            if (index % 1 === 0) rows.push([]);
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
            header: { text: 'Regions of Implementation', alignment: 'center' },
            footer: (currentPage, pageCount) => ({ 
                text: `Page ${currentPage} of ${pageCount}`,
                alignment: 'center' 
            }), 
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
                tableExample: { margin: [5, 5, 0, 5] },
                tableHeader: { margin: 5, color: 'white' },
                tableData: { margin: [5, 5, 30, 5] }
            }
        };
        // pdfMake.createPdf(dd).download('Groups');
        pdfMake.createPdf(dd).open();
    };

    // modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };

    const props = { 
        visible, setVisible, showUpdateModal, state, 
        onDelete, showModal, onExport, 
        fetchTargetGroups: () => fetchTargetGroups(dispatch)
    };
    return <TargetGroups  {...props} />;
}