import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Input, Radio, RadioGroup,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import {
  ChangeEvent, Suspense, useEffect, useState,
} from 'react';
import { useGetAllDues, usePostDues, usePutDues } from 'query/dues';
import useBooleanState from 'util/hooks/useBooleanState.ts';
import { STATUS_MAPPING } from 'util/constants/status';
import { useGetTracks } from 'query/tracks';
import LoadingSpinner from 'layout/LoadingSpinner';
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import useQueryParam from 'util/hooks/useQueryParam';
import { useSnackBar } from 'ts/useSnackBar';
import makeNumberArray from 'util/hooks/makeNumberArray';
import * as S from './style';

// TODO: 데이터를 가져와서 테이블에 뿌려주기(제대로 안됨)
type Status = 'PAID' | 'NOT_PAID' | 'SKIP' | null;

function DefaultTable() {
  const navigate = useNavigate();
  const page = useQueryParam('page', 'number') as number | null;
  const currentYear = new Date().getFullYear();
  const [duesYear, setDuesYear] = useState(page ? currentYear - page + 1 : currentYear);
  const [trackFilter, setTrackFilter] = useState([true, true, true, true, true, true]);
  const [name, setName] = useState('');
  const {
    value: isFilterModalOpen,
    setTrue: openFilterModal,
    setFalse: closeFilterModal,
  } = useBooleanState(false);
  const {
    value: isEditStatusModalOpen,
    setTrue: openEditStatusModal,
    setFalse: closeEditStatusModal,
  } = useBooleanState(false);
  const [requiredData, setRequiredData] = useState({
    year: duesYear,
    memberId: 0,
    month: 0,
    status: null,
    memo: '',
  });
  const [status, setStatus] = useState<Status>('PAID');

  const openSnackBar = useSnackBar();

  const { data: allDues, refetch } = useGetAllDues({ year: duesYear });
  const [filteredValue, setFilteredValue] = useState(allDues.dues);

  const { data: tracks } = useGetTracks();
  const postDuesMutation = usePostDues();
  const putDuesMutation = usePutDues();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    if (searchName === '') {
      if (trackFilter.every((value) => value)) {
        setFilteredValue(allDues.dues);
      } else {
        setFilteredValue(allDues.dues.filter((row) => trackFilter[tracks.map((track) => track.name).indexOf(row.track.name)]));
      }
    }
    setName(searchName);
  };

  const handleNameSearchClick = () => {
    if (filteredValue.some((row) => row.name.includes(name))) {
      setFilteredValue(allDues.dues.filter((row) => row.name.includes(name)));
    }
  };

  const handleNameSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameSearchClick();
    }
  };

  const handleTrackFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTrack = e.target.name;
    const trackIndex = tracks.filter((track) => track.name === selectedTrack)[0].id - 1;
    setTrackFilter((prevTrack) => {
      const updatedTrack = [...prevTrack];
      updatedTrack[trackIndex] = !updatedTrack[trackIndex];
      setFilteredValue(allDues.dues.filter(
        (row) => updatedTrack[tracks.map((track) => track.name).indexOf(row.track.name)],
      ));
      return updatedTrack;
    });
  };

  const handleEditStatusModalOpen = (month: number, memberId: number) => {
    openEditStatusModal();
    setRequiredData((prev) => {
      return {
        ...prev,
        year: duesYear,
        memberId,
        month,
      };
    });
  };

  const handleChangeMutationStatusClick = () => {
    // TODO: 이전 status와 수정하려는 status가 같은 경우 API 호출이 필요 없음
    const prevStatus = allDues.dues.find((row) => row.memberId === requiredData.memberId)?.detail.find((detail) => detail.month === requiredData.month)?.status;
    if (prevStatus !== status) {
      if (prevStatus === null) {
        postDuesMutation.mutate({
          year: requiredData.year,
          memberId: requiredData.memberId,
          month: requiredData.month,
          status,
          memo: requiredData.memo,
        });
      } else {
        putDuesMutation.mutate({
          year: requiredData.year,
          memberId: requiredData.memberId,
          month: requiredData.month,
          status,
          memo: requiredData.memo,
        });
      }
    }
    if (prevStatus === status) {
      openSnackBar({ type: 'info', message: '이전 상태와 같은 상태로 변경할 수 없습니다.' });
    } else {
      closeEditStatusModal();
    }
  };

  useEffect(() => {
    setDuesYear(page ? currentYear - page + 1 : currentYear);
    setFilteredValue(allDues.dues);
  }, [currentYear, page, allDues.dues]);

  useEffect(() => {
    if (postDuesMutation.isSuccess || putDuesMutation.isSuccess) {
      refetch();
      setFilteredValue(allDues.dues);
    }
  }, [postDuesMutation.isSuccess, putDuesMutation.isSuccess, refetch, allDues.dues]);

  const goToPrevYear = () => {
    // 재학생 회비 내역이 2021년부터 시작하므로 2021년 이전으로 이동할 수 없음
    const prevYear = page ? page + 1 : 2;
    if (prevYear <= currentYear - 2020) {
      navigate(`/edit-dues?page=${prevYear}`);
    }
  };

  const goToNextYear = () => {
    if (page && page > 1) {
      navigate(`/edit-dues?page=${page - 1}`);
    }
  };
  return (
    <>
      <div css={S.searchAndPagination}>
        <div css={S.pagination}>
          <Button onClick={goToPrevYear}>
            <ArrowBackIosNewOutlined />
          </Button>
          <span css={S.paginationTitle}>{duesYear}</span>
          <Button onClick={goToNextYear}>
            <ArrowForwardIosOutlined />
          </Button>
        </div>
        <div>
          <Input
            value={name}
            id="memberName"
            onKeyDown={handleNameSearchKeyDown}
            onChange={handleNameChange}
            placeholder="이름을 입력하세요"
          />
          <Button onClick={handleNameSearchClick}>검색</Button>
        </div>
      </div>
      <div css={S.dues}>
        <TableContainer css={S.tableContainer}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell css={S.tableHeader}>
                  <div css={S.trackTableCell}>
                    <span>트랙</span>
                    <button
                      type="button"
                      onClick={openFilterModal}
                      css={S.filterModalButton}
                    >
                      필터
                    </button>
                    <Modal
                      open={isFilterModalOpen}
                      onClose={closeFilterModal}
                    >
                      <div css={S.filterModalContainer}>
                        <h2>
                          트랙 선택
                        </h2>
                        <div css={S.filterModalContent}>
                          <FormControl css={S.checkboxFieldset} component="fieldset" variant="standard">
                            <FormLabel component="legend">원하는 트랙을 선택하세요.</FormLabel>
                            <FormGroup>
                              {tracks.map((track, index) => (
                                <FormControlLabel
                                  key={track.id}
                                  control={
                                    <Checkbox checked={trackFilter[index]} onChange={handleTrackFilterChange} name={track.name} />
                                      }
                                  label={track.name}
                                />
                              ))}
                            </FormGroup>
                          </FormControl>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </TableCell>
                <TableCell css={S.tableHeader}>미납 횟수</TableCell>
                <TableCell css={S.tableHeader}>이름</TableCell>
                {makeNumberArray(12, { start: 1 }).map((month) => (
                  <TableCell key={month} css={S.tableHeader}>
                    {month}
                    월
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredValue.map((row) => (
                <TableRow key={row.memberId}>
                  <TableCell css={S.tableBodyCell}>
                    {row.track.name}
                  </TableCell>
                  <TableCell css={S.tableBodyCell}>{row.unpaidCount}</TableCell>
                  <TableCell css={S.tableBodyCell}>{row.name}</TableCell>
                  {row.detail.map((dueDetail) => (
                    <TableCell
                      css={S.memoTableCell(dueDetail)}
                      onClick={() => handleEditStatusModalOpen(dueDetail.month, row.memberId)}
                      key={dueDetail.month}
                    >
                      {/* TODO: detail.status에 따른 UI */}
                      {/* 미납 X(빨강), 면제 -(초록), 납부 O(초록), null -(default) */}
                      {dueDetail.status !== null ? STATUS_MAPPING[dueDetail.status] : '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <Modal
                open={isEditStatusModalOpen}
                onClose={closeEditStatusModal}
              >
                <div css={S.editStatusModalContainer}>
                  {/* TODO: 면제 혹은 미납의 구체적인 사유 */}
                  <h2>회비 내역 수정</h2>
                  <div css={S.editStatusModalContent}>
                    <FormControl css={S.checkboxFieldset} component="fieldset" variant="standard">
                      <FormLabel component="legend">납부 상태를 선택하세요</FormLabel>
                      <FormGroup>
                        <RadioGroup
                          defaultValue="PAID"
                          value={status}
                          onChange={(e) => setStatus(e.target.value as Status)}
                        >
                          <FormControlLabel value="PAID" control={<Radio />} label="납부" />
                          <FormControlLabel value="NOT_PAID" control={<Radio />} label="미납" />
                          <FormControlLabel value="SKIP" control={<Radio />} label="면제" />
                          {(status === 'NOT_PAID' || status === 'SKIP') && (
                            <Input
                              css={S.memoInput}
                              value={requiredData.memo}
                              onChange={(e) => setRequiredData((prev) => ({ ...prev, memo: e.target.value }))}
                              placeholder="면제 혹은 미납의 사유를 입력하세요(공백 가능)"
                            />
                          )}
                        </RadioGroup>
                      </FormGroup>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleChangeMutationStatusClick}>확인</Button>
                  </div>
                </div>
              </Modal>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default function EditDues() {
  const page = useQueryParam('page', 'number') as number | null;
  const currentYear = new Date().getFullYear();
  const duesYear = page ? currentYear - page + 1 : currentYear;
  return (
    <div css={S.container}>
      <div css={S.topBar}>
        <h1 css={S.topBarTitle}>
          {duesYear}
          년 회비 내역 수정
        </h1>
      </div>
      <div css={S.mainContent}>
        <Suspense fallback={<LoadingSpinner />}>
          <DefaultTable />
        </Suspense>
      </div>
    </div>
  );
}