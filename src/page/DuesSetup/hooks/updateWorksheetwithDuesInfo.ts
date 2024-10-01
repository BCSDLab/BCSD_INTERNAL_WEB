import * as Excel from 'exceljs';
import { MemberDuesInfo } from './findMemberDuesInfo';

const NAME_ROW_NUMBER = 4;
const UNPAID_INFO_ROW_NUMBER = 7;

export function updateWorksheetWithDuesInfo(
  worksheet: Excel.CellValue[][],
  memberDuesInfo: MemberDuesInfo[],
) {
  const updatedWorksheet = worksheet.filter((_, index) => index > 0);
  return updatedWorksheet.map((row) => {
    const memberName = row[NAME_ROW_NUMBER] as string;
    const memberInfo = memberDuesInfo.find((info) => info.name === memberName);
    const updatedRow = [...row];

    if (memberInfo) {
      const unpaidMonths = memberInfo.notPaidMonthInfo
        .map(({ year, month }) => `${year}년 ${month}월`)
        .join(', ');

      updatedRow[UNPAID_INFO_ROW_NUMBER] = unpaidMonths;
    } else {
      updatedRow[UNPAID_INFO_ROW_NUMBER] = '';
    }

    return updatedRow;
  });
}
