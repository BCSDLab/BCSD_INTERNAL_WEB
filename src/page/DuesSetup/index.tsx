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

export default function DuesSetup() {
  const currentYear = new Date().getFullYear();
  const prevMonth = new Date().getMonth();
  const excelFileRef = useRef<HTMLInputElement>(null);
  const workbook = new Excel.Workbook();
  const tableHead = ['거래 일자', '구분', '거래 금액', '거래 후 잔액', '이름', '비고'];
  const [tableBody, setTableBody] = useState<TableBodyData[]>([
    { value: [] },
    { value: [] },
    { value: [] },
    { value: [] },
    { value: [] },
    { value: [] },
  ]);
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

  const handleExcelFileChange = async () => {
    setTableBody([
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
              setTableBody((prev) => {
                const newTableBody = [...prev];
                newTableBody[cellNumber - 1].value.push(cell.text);
                return newTableBody;
              });
              const currentYearUnpaidMonth = findUnpaidMonth(currentYearDues.dues, cellNumber === tableHead.indexOf('이름') + 1 ? cell.text : '')?.[0];
              const prevYearUnpaidMonth = findUnpaidMonth(prevYearDues.dues, cellNumber === tableHead.indexOf('이름') + 1 ? cell.text : '')?.[0];
              if (prevYearUnpaidMonth && currentYearUnpaidMonth) {
                setTableBody((prev) => {
                  const newTableBody = [...prev];
                  newTableBody[5].value[rowNumber - 5] = `${currentYear - 1}년 ${prevYearUnpaidMonth.join('월, ')}월, ${currentYear}년 ${currentYearUnpaidMonth.join('월, ')}월`;
                  return newTableBody;
                });
              } else if (prevYearUnpaidMonth) {
                setTableBody((prev) => {
                  const newTableBody = [...prev];
                  newTableBody[5].value[rowNumber - 5] = `${currentYear - 1}년 ${prevYearUnpaidMonth.join('월, ')}월`;
                  return newTableBody;
                });
              } else if (currentYearUnpaidMonth) {
                setTableBody((prev) => {
                  const newTableBody = [...prev];
                  newTableBody[5].value[rowNumber - 5] = `${currentYear}년 ${currentYearUnpaidMonth.join('월, ')}월`;
                  return newTableBody;
                });
              }
            }
          });
        });
      };
    }
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

  const findStatus = (memberId: number, month: number, dues: Dues[]) => {
    const memberDuesInfo = dues.find((member) => member.memberId === memberId);
    return memberDuesInfo?.detail[month].status;
  };

  // status가 NOT_PAID인 월을 찾아서 PAID로 변경 (PUT /dues)
  // status가 없는 경우 PAID로 변경 (POST /dues)
  const updateUnpaidtoPaid = (memberId: number, name: string, dues: Dues[], year: number, transactionAmount: number) => {
    const unpaidMonths = findUnpaidMonth(dues, name)?.[0];
    let count = 0;
    Array.from({ length: transactionAmount % 10000 }).forEach((_, index) => {
      const prevMonthStatus = findStatus(memberId, prevMonth, dues);
      if (unpaidMonths[index]) {
        const data: NewDuesData = {
          memberId,
          year,
          month: unpaidMonths[index],
          status: 'PAID',
        };
        putDuesMutation.mutate(data);
        count += 1;
      } else if (unpaidMonths[index] === undefined && prevMonthStatus === null && year === currentYear) {
        const data: NewDuesData = {
          memberId,
          year,
          month: prevMonth,
          status: 'PAID',
        };
        postDuesMutation.mutate(data);
        count += 1;
      }
    });
    return count;
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
      waiverMembersData.forEach((data) => {
        postDuesMutation.mutate(data);
      });
    }
  };

  const handleCreateDuesClick = () => {
    applyForDuesWaiver();
    tableBody[tableHead.indexOf('이름')].value.forEach((name, index) => {
      const memberId = findMemberId(name, index);
      const transactionAmount = Number(tableBody[2].value[index].replace(/,/g, ''));
      if (memberId) {
        const updatedTransactionCount = updateUnpaidtoPaid(memberId, name, prevYearDues.dues, currentYear - 1, transactionAmount);
        if (updatedTransactionCount !== transactionAmount % 10000) {
          updateUnpaidtoPaid(memberId, name, currentYearDues.dues, currentYear, updatedTransactionCount * 10000 - transactionAmount);
        }
      }
    });
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
