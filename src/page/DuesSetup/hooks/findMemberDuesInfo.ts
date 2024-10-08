import * as Excel from 'exceljs';
import { DuesInfo } from 'model/dues/allDues';
import { Pagination } from 'model/page';
import { Member } from 'model/member';

const NAME_ROW_NUMBER = 4;

interface FindMemberDuesInfoProps {
  worksheet: Excel.CellValue[][];
  members: Pagination<Member>;
  prevYearDues: DuesInfo;
  currentYearDues: DuesInfo;
}

export type MemberDuesInfo = { id: number, name: string, notPaidMonthInfo: { year: number, month: number }[] };

function findUnpaidMonths(duesInfo: DuesInfo | undefined, memberId: number, year: number) {
  if (!duesInfo) return [];
  const memberDues = duesInfo.dues.find((dues) => dues.memberId === memberId);
  return memberDues && memberDues.unpaidCount > 0
    ? memberDues.detail.filter((detail) => detail.status === 'NOT_PAID').map((detail) => ({ year, month: detail.month }))
    : [];
}

export function findMemberDuesInfo({
  worksheet, members, prevYearDues, currentYearDues,
}: FindMemberDuesInfoProps) {
  const result: MemberDuesInfo[] = [];
  const currentYear = new Date().getFullYear();

  worksheet.forEach((row) => {
    const memberName = row[NAME_ROW_NUMBER] as string;
    const memberInfo = members?.content.find((member) => member.name === memberName);

    if (memberInfo) {
      const unpaidMonthsPrevYear = findUnpaidMonths(prevYearDues, memberInfo.id, currentYear - 1);
      const unpaidMonthsCurrentYear = findUnpaidMonths(currentYearDues, memberInfo.id, currentYear);

      if (unpaidMonthsPrevYear.length > 0 || unpaidMonthsCurrentYear.length > 0) {
        result.push({
          id: memberInfo.id,
          name: memberName,
          notPaidMonthInfo: [...unpaidMonthsPrevYear, ...unpaidMonthsCurrentYear],
        });
      }
    }
  });

  return result;
}
