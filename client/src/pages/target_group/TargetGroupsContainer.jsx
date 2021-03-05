import React, { useState, useEffect,  useRef } from "react";
import { message } from "antd";
import { useGroupContext } from 'contexts'
import Api from 'api';
import TargetGroups from './TargetGroups';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function TargetGroupsContainer() {
    const { targetGroups, fetchTargetGroups } = useGroupContext();
    const [state, setState] = useState({
        groups: [], record: {}, pageSize: 5,
        page: 1, pageCount: 1
    });

    useEffect(() => {
        const groups = targetGroups.map(val => ({
            key: val.id, group: val.group
        }));
        setState(prev => {
            const pageCount = Math.ceil(groups.length/prev.pageSize);
            return {...prev, groups, pageCount};
        });
    }, [targetGroups]);

    const onDelete = key => {
        const res = window.confirm('Sure to delete group ?');
        if (res) {
            Api.targetGroup.delete(key)
            .then(res => fetchTargetGroups())
            .catch(err => {
                console.log(err);
                if (err.error) message.error(err.error.message);
            });
        }
    };

    // modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };

    const onPageChange = page => setState(prev => ({...prev, page}));

    const tableView = useRef();
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

    const props = { 
        visible, setVisible, showUpdateModal, state, 
        fetchTargetGroups, onDelete, showModal, onExport, 
        tableView, onPageChange
    };

    return (
        <TargetGroups  {...props} />
    );
}