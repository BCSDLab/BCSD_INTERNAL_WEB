import {
  Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { useRef, useState } from 'react';
import * as Excel from 'exceljs';
import { Dues } from 'model/dues/allDues';
import { useMutation } from '@tanstack/react-query';
import {
  NewDuesData, postDues, putDues,
} from 'api/Dues';
import { useGetMembers } from 'query/members';
import { useGetAllDues } from 'query/dues';
import { useSnackBar } from 'ts/useSnackBar';
import * as S from './style';

interface TableBodyData {
  value: string[];
}

interface DatesDuesApply {
  year: number[];
  prevYearMonth: number[];
  currentYearMonth: number[];
}
// 회비 생성
// 매월 1일에 회비 생성 (단 한번만 하는 기능임)

export default function DuesSetup() {
  const currentYear = new Date().getFullYear();
  const prevMonth = new Date().getMonth();
  const excelFileRef = useRef<HTMLInputElement>(null);
  const workbook = new Excel.Workbook();
  const tableHead = ['거래 일자', '구분', '거래 금액', '거래 후 잔액', '이름', '비고', '회비가 적용되는 날짜'];
  const [tableBody, setTableBody] = useState<TableBodyData[]>([
    { value: [] },
    { value: [] },
    { value: [] },
    { value: [] },
    { value: [] },
    { value: [] },
    { value: [] },
  ]);
  const [datesDuesApply, setDatesDuesApply] = useState<DatesDuesApply[]>([{ year: [], prevYearMonth: [], currentYearMonth: [] }]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { data: members } = useGetMembers({ pageIndex: 0, pageSize: 1000, trackId: null });
  const { data: currentYearDues } = useGetAllDues({ year: currentYear });
  const { data: prevYearDues } = useGetAllDues({ year: currentYear - 1 });

  const openSnackBar = useSnackBar();

  const onMutationSuccess = () => {
    openSnackBar({ type: 'success', message: '회비 생성이 완료되었습니다.' });
    setButtonDisabled(true);
  };

  const postDuesMutation = useMutation({
    mutationKey: ['postDues'],
    mutationFn: (data: NewDuesData) => postDues(data),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
  });

  const putDuesMutation = useMutation({
    mutationKey: ['putDues'],
    mutationFn: (data: NewDuesData) => putDues(data),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => onMutationSuccess(),
  });

  const findUnpaidMonth = (dues: Dues[], name: string) => {
    const unpaidPeople = dues.filter((value) => name !== '' && value.name === name && value.unpaidCount > 0);
    return (unpaidPeople.map((value) => value.detail.filter((detail) => detail.status === 'NOT_PAID'))).map((value) => value.map((detail) => detail.month));
  };

  const findStatus = (memberId: number, month: number, dues: Dues[]) => {
    const memberDuesInfo = dues.filter((value) => value.memberId === memberId)[0];
    return memberDuesInfo?.detail[month - 1].status;
  };

  const findNullStatusMonth = (memberId: number, dues: Dues[]) => {
    const memberDuesInfo = dues.filter((value) => value.memberId === memberId)[0];
    const result = Array.from({ length: 12 }).map((_, index) => {
      if (memberDuesInfo.detail[index].status === null) {
        return index + 1;
      }
      return null;
    });
    return result.filter((value): value is number => value !== null);
  };

  const findMemberId = (name: string, index: number) => {
    // 동명이인인 경우 비고에 memberId가 적혀있음(수기로 반드시 작성해야 함) 예시) memberId: 12
    const memberIdInNotes = tableBody[tableHead.indexOf('비고')].value[index]?.includes('memberId:');
    if (memberIdInNotes) {
      const memberId = tableBody[tableHead.indexOf('비고')].value[index].split('memberId:')[1];
      return Number(memberId);
    }

    const member = members?.content.find((value) => value.name === name);
    if (member) {
      return member.id;
    }

    return null;
  };

  // 회비가 적용될 달을 찾아서 테이블에 추가
  const findDuesMonths = () => {
    tableBody[4].value.forEach((name, index) => {
      const prevResult: number[] = [];
      const currentResult: number[] = [];
      const memberId = findMemberId(name, index);
      const transactionAmount = Number(tableBody[2].value[index].replace(/,/g, ''));
      const count = transactionAmount / 10000;
      const unpaidMonthsInPrevYear = findUnpaidMonth(prevYearDues.dues, name)?.[0];
      const unpaidMonthsInCurrentYear = findUnpaidMonth(currentYearDues.dues, name)?.[0];
      // 작년에 미납된 회비가 있을 경우
      if (unpaidMonthsInPrevYear && count > 0) {
        const updatedMonths = unpaidMonthsInPrevYear.slice(0, count);
        prevResult.push(...updatedMonths);
      }
      // 작년에 미납된 회비가 null일 경우
      if (prevResult.length < count) {
        const inAdvanceMonths = Array.from({ length: count - prevResult.length }).map((_, monthIndex) => {
          if (memberId) {
            const prevYearDuesStatus = findStatus(memberId, prevMonth, prevYearDues.dues);
            if (prevYearDuesStatus === null) {
              if (prevMonth + 1 + monthIndex > 12) {
                return null;
              }
              return prevMonth + 1 + monthIndex;
            }
          }
          return null;
        });
        prevResult.push(...inAdvanceMonths.filter((value): value is number => value !== null));
      }
      // 이번 해에 미납된 회비가 있을 경우
      if (unpaidMonthsInCurrentYear && prevResult.length < count) {
        const updatedMonths = unpaidMonthsInCurrentYear.slice(0, count - prevResult.length);
        currentResult.push(...updatedMonths);
      }
      // 이번 해에 미리 납부할 회비가 있을 경우 (반복해서 null인 값을 찾아야 함)
      if (currentResult.length < count) {
        const inAdvanceMonths = Array.from({ length: count - prevResult.length - currentResult.length }).map((_, monthIndex) => {
          if (memberId) {
            // 반복해서 null인 값을 찾아야 함 (month를 더해가면서 하면 되지 않을까?)
            const nullStatusMonths = findNullStatusMonth(memberId, currentYearDues.dues);
            return nullStatusMonths[monthIndex];
          }
          return null;
        });
        currentResult.push(...inAdvanceMonths.filter((value): value is number => value !== null));
      }
      const monthCountArray = [prevResult.length, currentResult.length];
      setTableBody((prev) => {
        const newTableBody = [...prev];
        if (monthCountArray[0] > 0 && monthCountArray[1] > 0) {
          newTableBody[6].value[index] = `${currentYear - 1}년 ${prevResult.join('월, ')}월 /${currentYear}년 ${currentResult.join(',월 ')}월`;
        } else if (monthCountArray[1] > 0) {
          newTableBody[6].value[index] = `${currentYear}년 ${currentResult.join('월, ')}월`;
        } else if (monthCountArray[0] > 0) {
          newTableBody[6].value[index] = `${currentYear - 1}년 ${prevResult.join('월, ')}월`;
        }
        return newTableBody;
      });
      setDatesDuesApply((prev) => {
        const newDatesDuesApply = [...prev];
        if (monthCountArray[0] > 0 && monthCountArray[1] > 0) {
          newDatesDuesApply[index] = { year: [currentYear, currentYear - 1], prevYearMonth: prevResult, currentYearMonth: currentResult };
        } else if (monthCountArray[0] > 0) {
          newDatesDuesApply[index] = { year: [currentYear - 1], prevYearMonth: prevResult, currentYearMonth: [] };
        } else if (monthCountArray[1] > 0) {
          newDatesDuesApply[index] = { year: [currentYear], prevYearMonth: [], currentYearMonth: currentResult };
        }
        return newDatesDuesApply;
      });
    });
  };

  const handleExcelFileChange = async () => {
    setTableBody([
      { value: [] },
      { value: [] },
      { value: [] },
      { value: [] },
      { value: [] },
      { value: [] },
      { value: [] },
    ]);
    const file = excelFileRef.current?.files?.[0];
    const reader = new FileReader();
    if (file) {
      setButtonDisabled(false);
      reader.readAsArrayBuffer(file);
      reader.onload = async (e) => {
        const buffer = e.target?.result;
        const data = new Uint8Array(buffer as ArrayBuffer);
        await workbook.xlsx.load(data);
        const worksheet = workbook.getWorksheet(1);

        worksheet?.eachRow((row, rowNumber) => {
          const totalRowNumber = worksheet.actualRowCount;
          row.eachCell((cell, cellNumber) => {
            if (cell.value !== null && rowNumber > 4 && rowNumber < totalRowNumber) {
              if (cellNumber !== 6) {
                setTableBody((prev) => {
                  const newTableBody = [...prev];
                  newTableBody[cellNumber - 1].value.push(cell.text);
                  return newTableBody;
                });
              } else {
                setTableBody((prev) => {
                  const newTableBody = [...prev];
                  newTableBody[cellNumber - 1].value[rowNumber - 5] = cell.text;
                  return newTableBody;
                });
              }
            }
          });
        });
      };
    }
  };

  // status가 NOT_PAID인 월을 찾아서 PAID로 변경 (PUT /dues)
  // status가 없는 경우 PAID로 변경 (POST /dues)
  const updateUnpaidtoPaid = (memberId: number, year: number, months: number[], dues: Dues[]) => {
    months.forEach((month) => {
      const monthStatus = findStatus(memberId, month, dues);
      if (monthStatus === 'NOT_PAID') {
        const data: NewDuesData = {
          memberId,
          year,
          month,
          status: 'PAID',
        };
        putDuesMutation.mutate(data);
      } else if (monthStatus === null) {
        const data: NewDuesData = {
          memberId,
          year,
          month,
          status: 'PAID',
        };
        postDuesMutation.mutate(data);
      }
    });
  };

  // 회비 면제인 경우 null -> SKIP (POST /dues)
  // authority가 manger, admin인 경우 적용
  const applyForDuesWaiver = () => {
    const waiverMember = members?.content.filter((value) => value.authority === 'MANAGER' || value.authority === 'ADMIN');
    if (waiverMember) {
      const waiverMembersData: NewDuesData[] = waiverMember.map((value) => {
        return {
          memberId: value.id,
          year: currentYear,
          month: prevMonth,
          status: 'SKIP',
        };
      });
      waiverMembersData.forEach((data, index) => {
        const memberId = waiverMember[index].id;
        // status null인 경우에만 면제 적용됨
        if (currentYearDues.dues.find((value) => value.memberId === memberId)?.detail[prevMonth - 1].status === null) {
          postDuesMutation.mutate(data);
        }
        if (prevMonth === 12 && prevYearDues.dues.find((value) => value.memberId === memberId)?.detail[prevMonth - 1].status === null) {
          const prevYearData = { ...data, year: currentYear - 1 };
          postDuesMutation.mutate(prevYearData);
        }
      });
    }
  };

  // status가 null인 prevMonth를 찾아서 NOT_PAID로 변경 (POST /dues)
  const updateNullToNotPaid = () => {
    const memberIds = members?.content.map((value) => value.id);
    memberIds?.forEach((memberId) => {
      const prevMonthStatus = findStatus(memberId, prevMonth, prevMonth === 12 ? prevYearDues.dues : currentYearDues.dues);
      if (prevMonthStatus === null) {
        const data: NewDuesData = {
          memberId,
          year: prevMonth === 12 ? currentYear - 1 : currentYear,
          month: prevMonth,
          status: 'NOT_PAID',
        };
        postDuesMutation.mutate(data);
      }
    });
  };

  const handleCreateDuesClick = () => {
    applyForDuesWaiver();
    tableBody[4].value.forEach((name, index) => {
      const memberId = findMemberId(name, index);
      const unpaidYear = datesDuesApply[index]?.year;
      const prevYearDuesApplyMonth = datesDuesApply[index]?.prevYearMonth;
      const currentYearDuesApplyMonth = datesDuesApply[index]?.currentYearMonth;
      if (memberId && unpaidYear.length === 2) {
        updateUnpaidtoPaid(memberId, currentYear - 1, prevYearDuesApplyMonth, prevYearDues.dues);
        updateUnpaidtoPaid(memberId, currentYear, currentYearDuesApplyMonth, currentYearDues.dues);
      } else if (memberId && unpaidYear.length === 1) {
        if (unpaidYear[0] === currentYear) {
          updateUnpaidtoPaid(memberId, currentYear, currentYearDuesApplyMonth, currentYearDues.dues);
        } else {
          updateUnpaidtoPaid(memberId, currentYear - 1, prevYearDuesApplyMonth, prevYearDues.dues);
        }
      }
    });
    updateNullToNotPaid();
  };
  return (
    <div css={S.container}>
      <div css={S.sidebar}>
        <img src="https://image.bcsdlab.com/banner.png" alt="logo" css={S.logo} />
        <Button variant="outlined" color="secondary" sx={{ marginTop: '20px' }}>회원정보</Button>
      </div>
      <div css={S.content}>
        <div css={S.topBar}>
          <h1 css={S.topBarTitle}>
            {currentYear}
            년
            {' '}
            {prevMonth}
            월 회비 생성
          </h1>
        </div>
        <form css={S.mainContent}>
          <ButtonGroup css={S.buttonGroup}>
            <label htmlFor="fileUpload">
              <Button variant="contained" color="primary" css={S.fileUploadButton}>
                엑셀 파일 업로드
                <input
                  type="file"
                  id="fileUpload"
                  accept=".xlsx"
                  css={S.fileUpload}
                  ref={excelFileRef}
                  onChange={handleExcelFileChange}
                />
              </Button>
            </label>
            <Button variant="contained" color="primary" onClick={findDuesMonths}>회비가 적용되는 날짜 찾기</Button>
            <Button variant="contained" color="primary" disabled={buttonDisabled} onClick={handleCreateDuesClick}>회비 생성</Button>
          </ButtonGroup>
          <Table>
            <TableHead>
              <TableRow>
                {tableHead.map((head) => {
                  return (
                    <TableCell css={S.tableCell} key={head}>{head}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBody[4].value.map((date, index) => {
                return (
                  <TableRow key={date}>
                    {tableBody.map((dues) => {
                      return (
                        <TableCell key={dues.value[index]}>{dues.value[index]}</TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </form>
      </div>
    </div>
  );
}
