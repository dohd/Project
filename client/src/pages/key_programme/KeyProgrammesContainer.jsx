import React, { useState, useEffect } from "react";

import KeyProgrammes from './KeyProgrammes';
import Api from 'api';
import { useTracked } from "context";
import { clientSocket } from "utils";

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const fetchKeyProgrammes = dispatch => {
    Api.keyProgramme.get()
    .then(res => {
        dispatch({
            type: 'addKeyProgrammes',
            payload: res
        });
        clientSocket.emit('keyProgrammes', res);
    });
};

export default function KeyProgrammesContainer() {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({
        programmes: [], record: {}
    });

    useEffect(() => {
        const list = store.keyProgrammes.map(v => ({
            key: v.id, programme: v.programme
        }));
        setState(prev => ({...prev, programmes: list}));
    }, [store.keyProgrammes]);

    const onDelete = key => {
        Api.keyProgramme.delete(key)
        .then(res => fetchKeyProgrammes(dispatch));
    };

    const tableView = {}
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

    // Modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };

    const props = {
        state, visible, setVisible, onExport, 
        showModal, showUpdateModal, onDelete,
        fetchKeyProgrammes: () => fetchKeyProgrammes(dispatch)
    };

    return <KeyProgrammes {...props} />;
}