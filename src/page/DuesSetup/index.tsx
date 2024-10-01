/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import {
  Suspense, useRef, useState,
} from 'react';
import LoadingSpinner from 'layout/LoadingSpinner';
import * as Excel from 'exceljs';
import { useGetMe, useGetMembers } from 'query/members';
import { useGetAllDues, usePostDues, usePutDues } from 'query/dues';
import { useReadExcelFile } from './hooks/useReadExcelFile';
import * as S from './style';
import { MemberDuesInfo, findMemberDuesInfo } from './hooks/findMemberDuesInfo';
import { updateWorksheetWithDuesInfo } from './hooks/updateWorksheetwithDuesInfo';
import { updateDues } from './hooks/updateDues';

function DefaultTable() {
  const currentYear = new Date().getFullYear();
  const excelFileRef = useRef<HTMLInputElement>(null);
  const tableHead = ['No', '거래 일시', '입금액', '출금액', '이름', '잔액', '비고', '현재 미납한 날짜'];
  const [tableBody, setTableBody] = useState<Excel.CellValue[][]>(Array.from({ length: tableHead.length }).map(() => []));
  const [buttonDisabled, setButtonDisabled] = useState(true);
  let unpaidMemberDuesInfo: MemberDuesInfo[] = [];

  const { data: getMe } = useGetMe();
  const { data: members } = useGetMembers({ pageIndex: 0, pageSize: 1000, trackId: null });
  const { data: prevYearDues } = useGetAllDues({ year: currentYear - 1 });
  const { data: currentYearDues } = useGetAllDues({ year: currentYear });

  const putDuesMutation = usePutDues();
  const postDuesMutation = usePostDues();

  const readExcelFile = useReadExcelFile(excelFileRef);

  const handleFileUpload = async () => {
    try {
      const worksheet = await readExcelFile();
      if (worksheet === null) return;
      setButtonDisabled(false);
      unpaidMemberDuesInfo = findMemberDuesInfo({
        worksheet, members, prevYearDues, currentYearDues,
      });
      setTableBody(updateWorksheetWithDuesInfo(worksheet, unpaidMemberDuesInfo));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateDues = () => {
    if (getMe.authority === 'MANAGER') {
      updateDues({
        worksheet: tableBody, members, unpaidMemberDuesInfo, currentYearDues, putDuesMutation, postDuesMutation,
      });
    }
  };

  return (
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
              onChange={handleFileUpload}
            />
          </Button>
        </label>
        <Button variant="contained" color="primary" disabled={buttonDisabled} onClick={handleCreateDues}>회비 생성</Button>
      </ButtonGroup>
      <Table>
        <TableHead>
          <TableRow>
            {tableHead.map((head) => (
              <TableCell key={head}>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBody.map((row, rowIndex) => (
            <TableRow key={row[rowIndex] as string | number}>
              {row.map((cell) => (
                <TableCell key={cell as string | number}>{cell as string | number}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </form>
  );
}

export default function DuesSetup() {
  return (
    <div css={S.container}>
      <Suspense fallback={<LoadingSpinner />}>
        <DefaultTable />
      </Suspense>
    </div>
  );
}
