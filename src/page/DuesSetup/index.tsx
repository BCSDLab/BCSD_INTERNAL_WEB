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

  const onError = useSnackBar();

  const postDuesMutation = useMutation({
    mutationKey: ['postDues'],
    mutationFn: (data: NewDuesData) => postDues(data),
    onError: (error) => onError(error),
  });

  const putDuesMutation = useMutation({
    mutationKey: ['putDues'],
    mutationFn: (data: NewDuesData) => putDues(data),
    onError: (error) => onError(error),
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

  const putDuesData = (memberId: number, month: number[], year: number, amount: number): NewDuesData[] => {
    let remainingAmount = amount;
    if (amount <= 0) return [];
    const duesData: NewDuesData[] = month?.map((m) => {
      remainingAmount -= 10000;
      return {
        memberId,
        year,
        month: m,
        status: remainingAmount >= 0 ? 'PAID' : 'NOT_PAID',
        memo: '',
      };
    });
    return duesData;
  };

  const postDuesData = (memberId: number, month: number, year: number): NewDuesData[] => {
    return [{
      memberId,
      year,
      month,
      status: 'NOT_PAID',
    }];
  };

  const extractDues = () => {
    const extractedDues: NewDuesData[] = [];

    tableBody[tableHead.indexOf('이름')].value.forEach((name, index) => {
      const memberId = findMemberId(name, index);
      const currentYearUnpaidMonth = findUnpaidMonth(currentYearDues.dues, name)[0];
      const prevYearUnpaidMonth = findUnpaidMonth(prevYearDues.dues, name)[0];
      if (memberId) {
        const amount = Number(tableBody[2].value[index].replace(/,/g, ''));
        const remainingAmount = amount - 10000 * (prevYearUnpaidMonth?.length || 0);
        const prevYearDuesData = putDuesData(memberId, prevYearUnpaidMonth, currentYear - 1, amount);
        const currentYearDuesData = putDuesData(memberId, currentYearUnpaidMonth, currentYear, remainingAmount);
        if (prevYearDuesData) {
          extractedDues.push(...prevYearDuesData);
        }
        if (currentYearDuesData) {
          extractedDues.push(...currentYearDuesData);
        }
      }
    });
    return extractedDues;
  };

  const changeCurrentDuesToNotPaid = () => {
    const duesData: NewDuesData[] = [];
    const currentMonth = new Date().getMonth() + 1;
    tableBody[tableHead.indexOf('이름')].value.forEach((name, index) => {
      const memberId = findMemberId(name, index);
      if (memberId) {
        const checkCurrentDues = currentYearDues.dues.find((value) => value.memberId === memberId);
        if (checkCurrentDues?.detail[currentMonth - 1].status === null) {
          duesData.push(...postDuesData(memberId, currentMonth, currentYear));
        }
      }
    });
    duesData.forEach((dues) => {
      postDuesMutation.mutate(dues);
    });
  };

  const handlePutDuesClick = () => {
    changeCurrentDuesToNotPaid();
    const duesData = extractDues();
    duesData.forEach((dues) => {
      putDuesMutation.mutate(dues);
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
            <Button variant="contained" color="primary" disabled={buttonDisabled} onClick={handlePutDuesClick}>회비 생성</Button>
            <Button variant="contained" color="primary" disabled={buttonDisabled}>엑셀 다운로드</Button>
          </ButtonGroup>
          <Table>
            <TableHead>
              <TableRow>
                {tableHead.map((head) => {
                  return (
                    <TableCell key={head}>{head}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBody[0].value.map((date, index) => {
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
