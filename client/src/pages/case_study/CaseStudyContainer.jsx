import React, { useEffect, useState } from 'react';

import CaseStudy from './CaseStudy';
import { useTracked } from 'context';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Api from 'api';
import { useParams } from 'react-router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const fetchNarrative = dispatch => {
    Api.narrative.get()
    .then(res => dispatch({
        type: 'addNarratives',
        payload: res
    }));
};

export default function CaseStudyContainer() {
    const { activityId } = useParams();
    
    const [store, dispatch] = useTracked();
    const [caseStudies, setCaseStudies] = useState([]);

    useEffect(() => {
        const list = [];
        for (const study of store.caseStudies) {
            const { title, activity } = study.narrativeReport;
            if (activity.id === parseInt(activityId)) {
                list.push({ 
                    key: study.id, 
                    caseStudy: study.case,
                    report: title
                });
            }
        }
        setCaseStudies(list);
    }, [store.caseStudies, activityId]);

    const onDelete = key => {
        Api.caseStudy.delete(key)
        .then(res => fetchNarrative(dispatch));
    };

    // modal logic
    const [record, setRecord] = useState({});
    const [visible, setVisible] = useState(false);

    const showModal = record => {
        setRecord(record);
        setVisible(true);
    };

    const tableView = {};
    const onExport = () => {
        const tableDom = tableView.current;
        const tableHeader = tableDom.getElementsByTagName('th');
        const tableHeaderText = [...tableHeader].map(el => ({
            text: el.textContent, style: 'tableHeader', bold: true,
        }));
        const tableRow = tableDom.getElementsByTagName('td');
        const tableRowCells = [...tableRow].map(el => ({
            text: el.textContent, style: 'tableData'
        }));

        const tableDataAsRows = tableRowCells.reduce((rows, cellData, index) => {
            if (index % 2 === 0) rows.push([]);
            rows[rows.length - 1].push(cellData);
            return rows;
        }, []);

        const tableBody = [
            tableHeaderText,
            ...tableDataAsRows,
        ];
        // console.log(tableBody);

        // Document definition
        const dd = {
            header: { text: 'Narrative Report Activity Case Study', alignment: 'center' },
            footer: (currentPage, pageCount) => ({ 
                // text: `Page ${state.page} of ${state.pageCount}`,
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
        // pdfMake.createPdf(dd).download('Narrative_Report_Activity_Case_Study');
        pdfMake.createPdf(dd).open();
    };

    const props = { 
        caseStudies, onExport, record, visible, 
        setVisible, showModal, onDelete,
        fetchNarrative: () => fetchNarrative(dispatch)
    };
    return <CaseStudy {...props} />
}