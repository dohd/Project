import React, { useState, useEffect,  useRef } from 'react';
import Donor from './Donor';
import { useDonorContext } from 'contexts';
import Api from 'api';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { message } from 'antd';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Donors(params) {
    const [state, setState] = useState({ 
        donors: [], record: {}, pageSize: 5,
        page: 1, pageCount: 1
    });
    
    const { donors, fetchDonors } = useDonorContext();
    useEffect(() => {
        const list = donors.map(val => ({...val, key: val.id}));
        setState(prev => {
            const pageCount = Math.ceil(list.length/prev.pageSize);
            return {...prev, donors: list, pageCount};
        });
    }, [donors]);

    // modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };

    const onDelete = key => {
        const res = window.confirm('Sure to delete donor ?');
        if (res) {
            Api.donor.delete(key)
            .then(res => fetchDonors())
            .catch(err => {
                console.log(err);
                if (err.error) message.error(err.error.message);
            });
        }
    };

    const onPageChange = page => setState(prev => ({...prev, page}));

    const tableView = useRef();
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
            .filter(val => val.text)
        );
        const tableHeaderRow = tableHeaderText.filter(val => val.text !== 'Action');

        const tableDataAsRows = tableRowCells.reduce((rows, cellData, index) => {
            if (index % 3 === 0) rows.push([]);
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
            header: { text: 'Donors', alignment: 'center' },
            footer: (currentPage, pageCount) => ({ 
                text: `Page ${state.page} of ${state.pageCount}`,
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
                tableExample: { margin: 5 },
                tableHeader: { margin: 5, color: 'white' },
                tableData: { margin: 5 }
            }
        };
        // pdfMake.createPdf(dd).download('Donors');
        pdfMake.createPdf(dd).open();
    };

    const props = {
        fetchDonors, visible, setVisible,
        showModal, showUpdateModal, onDelete,
        onExport, tableView, state, onPageChange
    };

    return <Donor {...props} />;
}