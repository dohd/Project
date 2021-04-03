import React, { useState, useEffect,  useRef } from 'react';

import Donor from './Donor';
import Api from 'api';
import { useTracked } from 'context';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const fetchDonors = dispatch => {
    Api.donor.get()
    .then(res => dispatch({
        type: 'addDonors',
        payload: res
    }));
};

export default function Donors() {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({ 
        donors: [], record: {}
    });
    
    useEffect(() => {
        const list = store.donors.map(val => ({...val, key: val.id}));
        setState(prev => ({...prev, donors: list}));
    }, [store.donors]);

    const onDelete = key => {
        Api.donor.delete(key)
        .then(res => fetchDonors(dispatch));
    };

    // modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };

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
        visible, setVisible,
        showModal, showUpdateModal, onDelete,
        onExport, state,
        fetchDonors: () => fetchDonors(dispatch)
    };
    return <Donor {...props} />;
}