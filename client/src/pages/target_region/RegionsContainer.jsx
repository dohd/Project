import React, { useState, useEffect } from "react";

import Regions from "./Regions";
import Api from 'api';
import { useTracked } from "context";

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const fetchTargetRegions = dispatch => {
    Api.targetRegion.get()
    .then(res => dispatch({
        type: 'addTargetRegions',
        payload: res
    }));
};

export default function RegionsContainer() {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({
        regions: [], record: {}
    });

    useEffect(() => {
        const list = store.targetRegions.map(v => ({
            key: v.id, region: v.area
        }));
        setState(prev => ({...prev, regions: list})); 
    }, [store.targetRegions]);

    const onDelete = key => {
        Api.targetRegion.delete(key)
        .then(res => fetchTargetRegions(dispatch));
    };

    const tableView = {};
    const onExport = () => {
        const tableDom = tableView.current;
        const tableHeader = tableDom.getElementsByTagName('th');
        const tableHeaderText = [...tableHeader].map(el => ({
            text: el.textContent, 
            style: 'tableHeader', 
            bold: true,
        }));
        const tableRow = tableDom.getElementsByTagName('td');
        const tableRowCells = (
            [...tableRow]
            .map(el => ({text: el.textContent, style: 'tableData'}))
            .filter(val => val.text)
        );

        const tableHeaderRow = tableHeaderText.filter(val => val.text === 'Region');

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
                tableData: { margin: [5, 5, 30, 5] }
            }
        };
        // pdfMake.createPdf(dd).download('Regions');
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
        visible, setVisible, showModal, 
        showUpdateModal, onDelete, onExport, state,
        fetchTargetRegions: () => fetchTargetRegions(dispatch)
    };
    return <Regions {...props} />;
}