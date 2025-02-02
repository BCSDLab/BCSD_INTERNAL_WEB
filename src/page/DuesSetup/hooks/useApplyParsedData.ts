import { DuesInfo } from 'model/dues/allDues';
import { useGetAllDues, usePostDues, usePutDues } from 'query/dues';
import { useGetMembers } from 'query/members';

interface ParseExcelData {
  memberId: number;
  name: string;
  duesCount: number;
}

interface FindUnpaidMonthProps {
  prevYearDues: DuesInfo;
  currentYearDues: DuesInfo;
  parseExcelData: ParseExcelData[];
}

interface ParseExcelDataWithUnpaidMonth extends ParseExcelData {
  unpaid: true;
  unpaidYear: number;
  unpaidMonth: number;
}

type ParsedExcelDataResult = ParseExcelDataWithUnpaidMonth | (ParseExcelData & { unpaid: false });

function findUnpaidMonth({ prevYearDues, currentYearDues, parseExcelData }: FindUnpaidMonthProps): ParsedExcelDataResult[] | null {
  const currentYear = new Date().getFullYear();
  const prevYear = currentYear - 1;

  if (!prevYearDues || !currentYearDues) return null;

  return parseExcelData.map((member) => {
    const prevYearDuesInfo = prevYearDues.dues.find((dues) => dues.memberId === member.memberId);
    if (prevYearDuesInfo && prevYearDuesInfo.unpaidCount > 0) {
      const unpaidMonth = prevYearDuesInfo.detail.find((dues) => dues.status === 'NOT_PAID')?.month;
      if (unpaidMonth) {
        return {
          ...member, unpaid: true, unpaidYear: prevYear, unpaidMonth,
        };
      }
    }

    const currentYearDuesInfo = currentYearDues.dues.find((dues) => dues.memberId === member.memberId);
    if (currentYearDuesInfo && currentYearDuesInfo.unpaidCount > 0) {
      const unpaidMonth = currentYearDuesInfo.detail.find((dues) => dues.status === 'NOT_PAID')?.month;
      if (unpaidMonth) {
        return {
          ...member, unpaid: true, unpaidYear: currentYear, unpaidMonth,
        };
      }
    }

    return { ...member, unpaid: false };
  });
}

function isPaidOrSkipMonth(duesInfo: DuesInfo, month: number, memberId: number) {
  return duesInfo.dues.find((dues) => dues.memberId === memberId)?.detail[month - 1].status === 'PAID'
  || duesInfo.dues.find((dues) => dues.memberId === memberId)?.detail[month - 1].status === 'SKIP';
}

function findFirstUnpaidMonth(prevYearDues: DuesInfo, currentYearDues: DuesInfo, startMonth: number, startYear: number, memberId: number) {
  // 12개월을 기준으로 순환
  const prevYear = new Date().getFullYear() - 1;
  return Array.from({ length: 12 }).map((_, index) => {
    const month = ((startMonth - 1 + index) % 12) + 1;
    const year = startMonth + index > 12 ? startYear + 1 : startYear;
    return { month, year };
  }).find(({ month, year }) => {
    return !isPaidOrSkipMonth(year === prevYear ? prevYearDues : currentYearDues, month, memberId);
  });
}

export function useApplyParsedData() {
  const prevYear = new Date().getFullYear() - 1;
  const currentYear = prevYear + 1;
  const prevMonth = new Date().getMonth() === 0 ? 12 : new Date().getMonth();

  const { data: prevYearDues } = useGetAllDues({ year: prevYear });
  const { data: currentYearDues } = useGetAllDues({ year: currentYear });
  const { data: members } = useGetMembers({ pageIndex: 0, pageSize: 1000, trackId: null });
  const duesMutation = usePostDues();
  const duesChangeMutation = usePutDues();

  const applyFeeStatus = (parseExcelData: ParseExcelData[]) => {
    const parseExcelDataWithUnpaidMonth = findUnpaidMonth({ prevYearDues, currentYearDues, parseExcelData });

    if (!parseExcelDataWithUnpaidMonth) return;
    parseExcelDataWithUnpaidMonth.forEach((member) => {
      if (member.unpaid) {
        Array.from({ length: member.duesCount }).forEach((_, index) => {
          const month = ((member.unpaidMonth - 1 + index) % 12) + 1;
          const year = member.unpaidMonth + index >= 12 ? member.unpaidYear + 1 : member.unpaidYear;
          duesChangeMutation.mutate({
            memberId: member.memberId,
            year,
            month,
            status: 'PAID',
          });
        });
      } else {
        Array.from({ length: member.duesCount }).forEach((_, index) => {
          const startMonth = ((prevMonth - 1 + index) % 12) + 1;
          const startYear = prevMonth + index > 12 ? currentYear : prevYear;
          const unpaidMonthYear = findFirstUnpaidMonth(prevYearDues, currentYearDues, startMonth, startYear, member.memberId);
          if (!unpaidMonthYear) return;
          const { month, year } = unpaidMonthYear;
          duesMutation.mutate({
            memberId: member.memberId,
            year,
            month,
            status: 'PAID',
          });
        });
      }
    });
  };

  const markExempt = () => {
    members.content.forEach((member) => {
      if (member.isFeeExempt) {
        const year = prevMonth === 12 ? prevYear : currentYear;
        duesMutation.mutate({
          memberId: member.id,
          year,
          month: prevMonth,
          status: 'SKIP',
        });
      }
    });
  };

  const updateUnpaidStatus = () => {
    // prevYearDues 값이 null일 때 확인 후 변경
    if (prevMonth === 12) {
      prevYearDues.dues.forEach((dues) => {
        const memberType = members.content.find((member) => member.id === dues.memberId)?.memberType;
        if (dues.detail[11].status === null && memberType === 'REGULAR') {
          duesMutation.mutate({
            memberId: dues.memberId,
            year: prevYear,
            month: 12,
            status: 'NOT_PAID',
          });
        }
      });
    } else {
      // currentYearDues 값이 null일 때 확인 후 변경
      currentYearDues.dues.forEach((dues) => {
        const memberType = members.content.find((member) => member.id === dues.memberId)?.memberType;
        if (dues.detail[prevMonth - 1].status === null && memberType === 'REGULAR') {
          duesMutation.mutate({
            memberId: dues.memberId,
            year: currentYear,
            month: prevMonth,
            status: 'NOT_PAID',
          });
        }
      });
    }
  };

  return { applyFeeStatus, markExempt, updateUnpaidStatus };
}
