import React, { useState, useEffect,  useRef } from "react";
import { message } from "antd";
import { useProgrammeContext } from 'contexts';
import Api from 'api';
import KeyProgrammes from './KeyProgrammes';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function KeyProgrammesContainer() {
    const { programmes, fetchProgrammes } = useProgrammeContext();
    const [state, setState] = useState({
        programmes: [], record: {}, pageSize: 15,
        page: 1, pageCount: 1
    });

    useEffect(() => {
        const list = programmes.map(val => ({
            key: val.id, programme: val.programme
        }));
        setState(prev => {
            const pageCount = Math.ceil(list.length/prev.pageSize);
            return {...prev, programmes: list, pageCount};
        });
    }, [programmes]);

    const onDelete = key => {
        const res = window.confirm('Sure to delete programme ?');
        if (res) {
            Api.keyProgramme.delete(key)
            .then(res => fetchProgrammes())
            .catch(err => {
                console.log(err);
                if (err.error) message.error(err.error.message);
            });
        }
    };

    // Modal logic
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
            alignment: 'center'
        }));
        const tableRow = tableDom.getElementsByTagName('td');
        const tableRowCells = (
            [...tableRow]
            .map(el => ({text: el.textContent, style: 'tableData'}))
            .filter(val => val.text)
        );

        const tableHeaderRow = tableHeaderText.filter(val => val.text === 'Programme');

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
            header: { text: 'Key Programmes', alignment: 'center' },
            footer: () => ({ 
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
                tableExample: { margin: [5, 5, 0, 5] },
                tableHeader: { margin: 5, color: 'white' },
                tableData: { margin: 5 }
            }
        };
        // pdfMake.createPdf(dd).download('Key_Programmes');
        pdfMake.createPdf(dd).open();
    };

    const props = {
        state, fetchProgrammes, visible, setVisible,
        showModal, showUpdateModal, onDelete,
        tableView, onExport, onPageChange
    };

    return <KeyProgrammes {...props} />;
}