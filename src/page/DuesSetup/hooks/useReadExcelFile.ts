import * as Excel from 'exceljs';

function makeWorksheetToArray(worksheet: Excel.Worksheet): Excel.CellValue[][] {
  const result: Excel.CellValue[][] = [];
  worksheet.eachRow((row, rowNumber) => {
    result.push([]);
    row.eachCell((cell) => {
      if (cell.value !== null && cell.value !== undefined) {
        result[rowNumber - 1].push(cell.value);
      }
    });
  });
  return result;
}

export function useReadExcelFile(excelFileRef: React.RefObject<HTMLInputElement>): () => Promise<Excel.CellValue[][] | null> {
  const readFile: () => Promise<Excel.CellValue[][] | null> = async () => {
    const workbook = new Excel.Workbook();
    const file = excelFileRef.current?.files?.[0];
    if (!file) return null;

    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          await workbook.xlsx.load(data);
          const worksheet = workbook.getWorksheet(1);
          if (!worksheet) {
            reject(new Error('worksheet is not found'));
          }
          resolve(worksheet ? makeWorksheetToArray(worksheet) : null);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  return readFile;
}
