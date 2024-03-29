import React, { useEffect, useState, useRef } from 'react';
import { useCaseStudyContext } from 'contexts';
import CaseStudy from './CaseStudy';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function CaseStudyContainer() {
    const { caseStudies } = useCaseStudyContext();
    const [state, setState] = useState({
        caseStudies: [], pageSize: 5,
        page: 1, pageCount: 1
    });
    useEffect(() => {
        const list = caseStudies.map(val => ({
            key: val.id, 
            caseStudy: val.case,
            activity: val.narrativeReport.activity.action
        }));
        setState(prev => {
            const pageCount = Math.ceil(list.length/prev.pageSize);
            return {...prev, caseStudies: list, pageCount};
        });
    }, [caseStudies]);

    const onPageChange = page => setState(prev => ({...prev, page}));

    const tableView = useRef();
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
                text: `Page ${state.page} of ${state.pageCount}`,
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

    const props = { state, tableView, onExport, onPageChange };

    return <CaseStudy {...props} />
}