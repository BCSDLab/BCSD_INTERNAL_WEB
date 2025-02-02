import { useGetMembers } from 'query/members';
import * as Excel from 'exceljs';

const DUES_INDEX = 2;
const NAME_INDEX = 4;
const NOTES_INDEX = 6;

export function useParseExcelData() {
  const { data: members } = useGetMembers({ pageIndex: 0, pageSize: 1000, trackId: null });
  const parseExcelData = (excelArray: (Excel.CellValue)[][]) => {
    const filteredExcelArray = excelArray.filter((row, index) => row[NOTES_INDEX] !== 'X' && row[NOTES_INDEX] !== 'x' && index !== 0);

    const duesInfo = filteredExcelArray.map((row) => {
      const duesCount = Number(String(row[DUES_INDEX]).split(',').join('')) / 10000;
      const name = row[NAME_INDEX] as string;
      if (row[NOTES_INDEX] !== undefined) {
        const memberId = Number(String(row[NOTES_INDEX]).split('=')[1]);
        return { memberId, name, duesCount };
      }
      const memberId = members.content.find((member) => member.name === name)?.id;
      if (!memberId) throw new Error('회원 정보가 없습니다.');
      return { memberId, name, duesCount };
    });
    return duesInfo;
  };
  return { parseExcelData };
}
