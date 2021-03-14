import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function pdfExport(tableView, state) {
    const tableDom = tableView.current;
    const tableHeader = tableDom.getElementsByTagName('th');
    const tableHeaderText = [...tableHeader].map(el => ({
        text: el.textContent, style: 'tableHeader', bold: true 
    }));
    const tableRow = tableDom.getElementsByTagName('td');
    const tableRowCells = [...tableRow].map(el => ({
        text: el.textContent, style: 'tableData'
    }));

    // insert empty strings for column span
    const chunk1 = [
        { text: 'Activity', colSpan: 2, }, '',
        { text: 'Plan', colSpan: 3, }, '', '',
        { text: 'Gender', colSpan: 4, }, '', '', ''
    ];

    const headerRow1 = chunk1.map(val => {
        if (typeof val === 'string') return val;
        val.style = 'tableHeader'
        val.bold = true;
        val.alignment = 'center'
        return val;
    });
    const headerRow2 = tableHeaderText.slice(3);

    const tableDataAsRows = tableRowCells.reduce((rows, cellData, index) => {
        if (index % 9 === 0) rows.push([]);
        rows[rows.length - 1].push(cellData);
        return rows;
    }, []);

    const tableBody = [
        headerRow1, 
        headerRow2,
        ...tableDataAsRows,
    ];
    // console.log(tableBody);

    // Document definition
    const dd = {
        header: { text: 'Participant Analysis', alignment: 'center' },
        footer: (currentPage, pageCount) => ({ 
            text: `Page ${state.page} of ${state.pageCount}`,
            alignment: 'center' 
        }), 
        pageOrientation: 'landscape',
        content: [
            {
                style: 'tableExample',
                table: { headerRows: 2, body: tableBody },
                layout: {
                    fillColor: (rowIndex) => {
                        if (rowIndex === 0 || rowIndex === 1) return '#0f4871';
                        return (rowIndex % 2 === 0) ? '#f2f2f2' : null;
                    }
                }
            }
        ],
        styles: {
            tableExample: { margin: [0, 5, 0, 5] },
            tableHeader: { margin: 5, color: 'white' },
            tableData: { margin: 5 }
        }
    };
    // pdfMake.createPdf(dd).download('Participant Analysis');
    pdfMake.createPdf(dd).open();   
}