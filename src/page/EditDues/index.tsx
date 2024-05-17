import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Input, Popover, Radio, RadioGroup,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import {
  ChangeEvent, Suspense, useEffect, useState,
} from 'react';
import {
  useDeleteDues, useGetAllDues, usePostDues, usePutDues,
} from 'query/dues';
import useBooleanState from 'util/hooks/useBooleanState.ts';
import { STATUS_MAPPING } from 'util/constants/status';
import { useGetTracks } from 'query/tracks';
import LoadingSpinner from 'layout/LoadingSpinner';
import {
  ArrowDownward, ArrowUpward, Sort,
} from '@mui/icons-material';
import useQueryParam from 'util/hooks/useQueryParam';
import { useSnackBar } from 'ts/useSnackBar';
import makeNumberArray from 'util/hooks/makeNumberArray';
import { NewDuesData } from 'api/dues';
import { useGetMembers } from 'query/members';
import YearPagination from 'component/YearPagination';
import * as S from './style';

type Status = 'PAID' | 'NOT_PAID' | 'SKIP' | 'NONE';

interface SortAnchorEl {
  name: null | HTMLElement;
  unpaidCount: null | HTMLElement;
}

function DefaultTable() {
  const param = useQueryParam('page');
  const page = Number(param);
  const currentYear = new Date().getFullYear();
  const [duesYear, setDuesYear] = useState(page ? currentYear - page + 1 : currentYear);
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
  const [requiredData, setRequiredData] = useState<NewDuesData>({
    year: duesYear,
    memberId: 0,
    month: 0,
    status: null,
    memo: '',
  });
  const [status, setStatus] = useState<Status>('PAID');
  const [sortAnchorEl, setSortAnchorEl] = useState<SortAnchorEl>({
    name: null,
    unpaidCount: null,
  });

  const openSnackBar = useSnackBar();

  const { data: allDues, refetch } = useGetAllDues({ year: duesYear });
  const { data: members } = useGetMembers({ pageIndex: 0, pageSize: 1000, trackId: null });
  const [filteredValue, setFilteredValue] = useState(allDues.dues.filter((row) => members?.content.some((member) => member.memberType === 'REGULAR' && member.id === row.memberId)));

  const { data: tracks } = useGetTracks();
  const [trackFilter, setTrackFilter] = useState(tracks.map(() => true));
  const postDuesMutation = usePostDues();
  const putDuesMutation = usePutDues();
  const deleteDuesMutation = useDeleteDues();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    if (searchName === '') {
      if (trackFilter.every((value) => value)) {
        setFilteredValue(allDues.dues.filter((row) => members?.content.some((member) => member.memberType === 'REGULAR' && member.id === row.memberId)));
      } else {
        setFilteredValue(allDues.dues.filter((row) => members?.content.some((member) => member.memberType === 'REGULAR' && member.id === row.memberId) && trackFilter[tracks.map((track) => track.name).indexOf(row.track.name)]));
      }
    }
    setName(searchName);
  };

  const handleNameSearchClick = () => {
    if (filteredValue.some((row) => row.name.includes(name))) {
      setFilteredValue(allDues.dues.filter((row) => row.name.includes(name) && members?.content.some((member) => member.memberType === 'REGULAR' && member.id === row.memberId)));
    } else {
      openSnackBar({ type: 'error', message: '해당 이름을 가진 회원이 없습니다.' });
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
      setFilteredValue(allDues.dues.filter((row) => updatedTrack[tracks.map((track) => track.name).indexOf(row.track.name)]
      && members?.content.some((member) => member.memberType === 'REGULAR' && member.id === row.memberId)));
      return updatedTrack;
    });
  };

  const handleEditStatusModalOpen = (month: number, memberId: number) => {
    openEditStatusModal();
    setRequiredData((prev: NewDuesData) => {
      return {
        ...prev,
        year: duesYear,
        memberId,
        month,
      };
    });
  };

  const handleChangeMutationStatusClick = () => {
    const prevStatus = allDues.dues.find((row) => row.memberId === requiredData.memberId)?.detail.find((detail) => detail.month === requiredData.month)?.status;
    if (prevStatus !== status || (prevStatus === status && requiredData.memo !== '')) {
      if (prevStatus === null) {
        postDuesMutation.mutate({
          year: requiredData.year,
          memberId: requiredData.memberId,
          month: requiredData.month,
          status: status === 'NONE' ? null : status,
          memo: requiredData.memo,
        });
      } else if (status !== 'NONE') {
        putDuesMutation.mutate({
          year: requiredData.year,
          memberId: requiredData.memberId,
          month: requiredData.month,
          status,
          memo: requiredData.memo,
        });
      }
      if (status === 'NONE') {
        deleteDuesMutation.mutate({
          year: requiredData.year,
          memberId: requiredData.memberId,
          month: requiredData.month,
        });
      }
    }
    if (prevStatus === status && requiredData.memo === '') {
      openSnackBar({ type: 'info', message: '이전 상태와 같은 상태로 변경할 수 없습니다.' });
    } else {
      closeEditStatusModal();
    }
  };

  // 연도 변경 시, 데이터를 다시 설정함
  useEffect(() => {
    if (allDues.dues) {
      setFilteredValue(allDues.dues.filter((row) => members?.content.some((member) => member.memberType === 'REGULAR' && member.id === row.memberId)));
    }
  }, [allDues.dues, members?.content]);

  // API 호출 성공 시, 데이터를 다시 불러옴
  useEffect(() => {
    if (postDuesMutation.isSuccess || putDuesMutation.isSuccess || deleteDuesMutation.isSuccess) {
      refetch();
      setFilteredValue(allDues.dues.filter((row) => members?.content.some((member) => member.memberType === 'REGULAR' && member.id === row.memberId)));
    }
  }, [postDuesMutation.isSuccess, putDuesMutation.isSuccess, deleteDuesMutation.isSuccess, refetch, allDues.dues, members?.content]);

  const sortInAscendingOrderByName = () => {
    setFilteredValue((prev) => {
      return prev.sort((a, b) => a.name.localeCompare(b.name));
    });
    setSortAnchorEl((prev) => ({ ...prev, name: null }));
  };

  const sortInDescendingOrderByName = () => {
    setFilteredValue((prev) => {
      return prev.sort((a, b) => b.name.localeCompare(a.name));
    });
    setSortAnchorEl((prev) => ({ ...prev, name: null }));
  };

  const sortInAscendingOrderByUnpaidCount = () => {
    setFilteredValue((prevValue) => prevValue.sort((a, b) => {
      if (a.unpaidCount > b.unpaidCount) return 1;
      if (a.unpaidCount < b.unpaidCount) return -1;

      if (a.name.localeCompare(b.name) > 0) return 1;
      if (a.name.localeCompare(b.name) < 0) return -1;
      return 0;
    }));
    setSortAnchorEl((prev) => ({ ...prev, unpaidCount: null }));
  };

  const sortInDescendingOrderByUnpaidCount = () => {
    setFilteredValue((prevValue) => prevValue.sort((a, b) => {
      if (a.unpaidCount < b.unpaidCount) return 1;
      if (a.unpaidCount > b.unpaidCount) return -1;

      if (a.name.localeCompare(b.name) > 0) return 1;
      if (a.name.localeCompare(b.name) < 0) return -1;
      return 0;
    }));
    setSortAnchorEl((prev) => ({ ...prev, unpaidCount: null }));
  };

  return (
    <>
      <div css={S.searchAndPagination}>
        <div css={S.pagination}>
          <YearPagination duesYear={duesYear} setDuesYear={setDuesYear} />
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
                    <Button
                      type="button"
                      onClick={openFilterModal}
                      css={S.filterModalButton}
                    >
                      <Sort css={S.sortLogo} />
                    </Button>
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
                <TableCell css={S.tableHeader}>
                  <span>미납 횟수</span>
                  <Button
                    type="button"
                    onClick={(e) => setSortAnchorEl((prev) => ({ ...prev, unpaidCount: e.currentTarget }))}
                    css={S.filterModalButton}
                  >
                    <Sort css={S.sortLogo} />
                  </Button>
                  <Popover
                    id="simple-popover"
                    open={Boolean(sortAnchorEl.unpaidCount)}
                    anchorEl={sortAnchorEl.unpaidCount}
                    onClose={() => setSortAnchorEl((prev) => ({ ...prev, unpaidCount: null }))}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <div css={S.sortPopover}>
                      <h3>
                        미납 횟수순 정렬
                      </h3>
                      <div css={S.sortPopoverButtonGroup}>
                        <Button variant="contained" color="primary" onClick={sortInAscendingOrderByUnpaidCount}>
                          <ArrowUpward />
                          오름차순
                        </Button>
                        <Button variant="contained" color="primary" onClick={sortInDescendingOrderByUnpaidCount}>
                          <ArrowDownward />
                          내림차순
                        </Button>
                      </div>
                    </div>
                  </Popover>
                </TableCell>
                <TableCell css={S.tableHeader}>
                  <div css={S.nameTableCell}>
                    <span>이름</span>
                    <Button
                      type="button"
                      onClick={(e) => setSortAnchorEl((prev) => ({ ...prev, name: e.currentTarget }))}
                      css={S.filterModalButton}
                    >
                      <Sort css={S.sortLogo} />
                    </Button>
                    <Popover
                      id="simple-popover"
                      open={Boolean(sortAnchorEl.name)}
                      anchorEl={sortAnchorEl.name}
                      onClose={() => setSortAnchorEl((prev) => ({ ...prev, name: null }))}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                    >
                      <div css={S.sortPopover}>
                        <h3>
                          이름순 정렬
                        </h3>
                        <div css={S.sortPopoverButtonGroup}>
                          <Button variant="contained" color="primary" onClick={sortInAscendingOrderByName}>
                            <ArrowUpward />
                            오름차순
                          </Button>
                          <Button variant="contained" color="primary" onClick={sortInDescendingOrderByName}>
                            <ArrowDownward />
                            내림차순
                          </Button>
                        </div>
                      </div>
                    </Popover>
                  </div>
                </TableCell>
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
                          <FormControlLabel value="NONE" control={<Radio />} label="상태 없음" />
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
  return (
    <div css={S.container}>
      <div css={S.mainContent}>
        <Suspense fallback={<LoadingSpinner />}>
          <DefaultTable />
        </Suspense>
      </div>
    </div>
  );
}
