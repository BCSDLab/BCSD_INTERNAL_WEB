/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import {
  Suspense, useRef, useState,
} from 'react';
import LoadingSpinner from 'layout/LoadingSpinner';
import * as Excel from 'exceljs';
import { useGetMe } from 'query/members';
import { useSnackBar } from 'ts/useSnackBar';
import { useReadExcelFile } from './hooks/useReadExcelFile';
import * as S from './style';
import { useWorkflowPipeline } from './hooks/useWorkflowPipeline';

const tableHead = ['No', '거래 일시', '입금액', '출금액', '이름', '잔액', '비고'];

function DefaultTable() {
  const [tableBody, setTableBody] = useState<Excel.CellValue[][]>(Array.from({ length: tableHead.length }).map(() => []));
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const excelFileRef = useRef<HTMLInputElement>(null);

  const { data: getMe } = useGetMe();

  const openSnackBar = useSnackBar();
  const readExcelFile = useReadExcelFile(excelFileRef);
  const { runWorkflow } = useWorkflowPipeline({ excelFileRef });

  const handleFileUpload = async () => {
    try {
      const worksheet = await readExcelFile();
      if (worksheet === null) return;
      setButtonDisabled(false);
      setTableBody(worksheet.filter((_, index) => index > 0));
    } catch (error) {
      if (error instanceof Error) {
        openSnackBar({ type: 'error', message: error.message });
      }
    }
  };

  const handleCreateDues = () => {
    if (getMe.authority === 'MANAGER') {
      runWorkflow();
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
