import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Input, Popover,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import {
  ChangeEvent, Suspense, useEffect, useState,
} from 'react';
import { useGetAllDues } from 'query/dues';
import useBooleanState from 'util/hooks/useBooleanState.ts';
import { DuesDetail } from 'model/dues/allDues';
import { STATUS, STATUS_MAPPING } from 'util/constants/status';
import { useGetTracks } from 'query/tracks';
import LoadingSpinner from 'layout/LoadingSpinner';
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import useQueryParam from 'util/hooks/useQueryParam';
import * as S from './style';

function DefaultTable() {
  const navigate = useNavigate();
  const page = useQueryParam('page', 'number') as number;
  const currentYear = new Date().getFullYear();
  const [duesYear, setDuesYear] = useState(currentYear - page + 1);
  const [trackFilter, setTrackFilter] = useState([true, true, true, true, true, true]);
  const [name, setName] = useState('');
  const [detail, setDetail] = useState<DuesDetail>({ month: 0, status: null });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const memoPopOverOpen = Boolean(anchorEl);
  const {
    value: isFilterModalOpen,
    setTrue: openFilterModal,
    setFalse: closeFilterModal,
  } = useBooleanState(false);

  const { data: allDues } = useGetAllDues({ year: duesYear });
  const [filteredValue, setFilteredValue] = useState(allDues.dues);

  const { data: tracks } = useGetTracks();

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

  const handleMemoClick = (e: React.MouseEvent<HTMLTableCellElement>, dueDetail: DuesDetail) => {
    if (dueDetail.status === 'NOT_PAID' || dueDetail.status === 'SKIP') {
      setAnchorEl(e.currentTarget);
      if (dueDetail.memo) {
        setDetail(dueDetail);
      }
    }
  };

  useEffect(() => {
    setDuesYear(currentYear - page + 1);
    setFilteredValue(allDues.dues);
  }, [currentYear, page, allDues.dues]);

  const goToPrevYear = () => {
    // 재학생 회비 내역이 2021년부터 시작하므로 2021년 이전으로 이동할 수 없음
    if (page < 4) {
      const prevYear = page + 1;
      navigate(`/dues?page=${prevYear}`);
    }
  };

  const goToNextYear = () => {
    if (page > 1) {
      navigate(`/dues?page=${page - 1}`);
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
                              {tracks.map((track, index) => {
                                return (
                                  <FormControlLabel
                                    key={track.id}
                                    control={
                                      <Checkbox checked={trackFilter[index]} onChange={handleTrackFilterChange} name={track.name} />
                                      }
                                    label={track.name}
                                  />
                                );
                              })}
                            </FormGroup>
                          </FormControl>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </TableCell>
                <TableCell css={S.tableHeader}>미납 횟수</TableCell>
                <TableCell css={S.tableHeader}>이름</TableCell>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
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
                      onClick={(e) => handleMemoClick(e, dueDetail)}
                      key={dueDetail.month}
                    >
                      {/* TODO: detail.status에 따른 UI */}
                      {/* 미납 X(빨강), 면제 -(초록), 납부 O(초록), null -(default) */}
                      {dueDetail.status !== null ? STATUS_MAPPING[dueDetail.status] : '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <Popover
                id="simple-popover"
                open={memoPopOverOpen}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div css={S.memoPopover}>
                  <h3>
                    {STATUS[detail.status as 'NOT_PAID' | 'SKIP']}
                    {' '}
                    사유
                  </h3>
                  <span css={S.memoPopoverText}>{detail.memo}</span>
                </div>
              </Popover>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default function DuesManagement() {
  const page = useQueryParam('page', 'number') as number;
  const currentYear = new Date().getFullYear();
  const duesYear = currentYear - page + 1;
  return (
    <div css={S.container}>
      <div css={S.sidebar}>
        <img src="https://image.bcsdlab.com/banner.png" alt="logo" css={S.logo} />
        <Button variant="outlined" color="secondary" sx={{ marginTop: '20px' }}>회원정보</Button>
      </div>
      <div css={S.content}>
        <div css={S.topBar}>
          <h1 css={S.topBarTitle}>
            {duesYear}
            년 회비 내역
          </h1>
        </div>
        <div css={S.mainContent}>
          <Suspense fallback={<LoadingSpinner />}>
            <DefaultTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
