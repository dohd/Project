import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function pdfExport(tableView, state) {
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
        if (index % 4 === 0) rows.push([]);
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
        header: { text: 'Narrative Report Agenda', alignment: 'center' },
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
    // pdfMake.createPdf(dd).download('Narrative_Report_Agenda');
    pdfMake.createPdf(dd).open();
}