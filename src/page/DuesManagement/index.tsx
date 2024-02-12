import { Link, useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {
  Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Input, Popover,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { ChangeEvent, useState } from 'react';
import { useGetAllDues } from 'query/dues';
import useBooleanState from 'util/hooks/useBooleanState.ts';
import { DuesDetail } from 'model/dues/allDues';
import { ALL_TRACKS, STATUS_MAPPING } from 'util/constants/alltracks.ts';
import * as S from './style';

export default function DuesManagement() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const thisYear = new Date().getFullYear();
  const duesYear = thisYear - page + 1;
  const [track, setTrack] = useState([true, true, true, true, true, true]);
  const [name, setName] = useState('');
  const [detail, setDetail] = useState<DuesDetail>({ month: 0, status: null });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const memoPopOverOpen = Boolean(anchorEl);
  const {
    value: isFilterModalOpen,
    setTrue: openFilterModal,
    setFalse: closeFilterModal,
  } = useBooleanState(false);

  const { allDues } = useGetAllDues(duesYear);
  const [filteredValue, setFilteredValue] = useState(allDues.dues);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    if (searchName === '') {
      if (track.every((value) => value)) {
        setFilteredValue(allDues.dues);
      } else {
        setFilteredValue(allDues.dues.filter((row) => track[ALL_TRACKS.indexOf(row.track.name)]));
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
    const trackIndex = ALL_TRACKS.indexOf(selectedTrack);
    setTrack((prevTrack) => {
      const updatedTrack = [...prevTrack];
      updatedTrack[trackIndex] = !updatedTrack[trackIndex];
      setFilteredValue(allDues.dues.filter(
        (row) => updatedTrack[ALL_TRACKS.indexOf(row.track.name)],
      ));
      return updatedTrack;
    });
  };

  const handleMemoClick = (e: React.MouseEvent<HTMLTableCellElement>, dueDetail: DuesDetail) => {
    if (dueDetail.status === '미납' || dueDetail.status === '면제') {
      setAnchorEl(e.currentTarget);
      if (dueDetail.memo) {
        setDetail(dueDetail);
      }
    }
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
            {duesYear}
            년 회비 내역
          </h1>
        </div>
        <div css={S.searchName}>
          <Input
            value={name}
            id="memberName"
            onKeyDown={handleNameSearchKeyDown}
            onChange={handleNameChange}
            placeholder="이름을 입력하세요"
          />
          <Button onClick={handleNameSearchClick}>검색</Button>
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
                                <FormControlLabel
                                  control={
                                    <Checkbox checked={track[0]} onChange={handleTrackFilterChange} name="FRONTEND" />
                                    }
                                  label="FRONTEND"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox checked={track[1]} onChange={handleTrackFilterChange} name="BACKEND" />
                                    }
                                  label="BACKEND"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox checked={track[2]} onChange={handleTrackFilterChange} name="GAME" />
                                    }
                                  label="Game"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox checked={track[3]} onChange={handleTrackFilterChange} name="ANDROID" />
                                    }
                                  label="ANDROID"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox checked={track[4]} onChange={handleTrackFilterChange} name="IOS" />
                                    }
                                  label="IOS"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox checked={track[5]} onChange={handleTrackFilterChange} name="UI/UX" />
                                    }
                                  label="UI/UX"
                                />
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
                  <TableRow
                    key={row.memberId}
                  >
                    <TableCell component="th" scope="row">
                      {row.track.name}
                    </TableCell>
                    <TableCell>{row.unpaidCount}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    {row.detail.map((dueDetail) => (
                      <TableCell
                        css={S.memoTableCell(dueDetail)}
                        onClick={(e) => handleMemoClick(e, detail)}
                        key={detail.month}
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
                    {/* TODO: 면제 혹은 미납의 구체적인 사유 */}
                    <h3>
                      {detail.status}
                      {' '}
                      사유
                    </h3>
                    {detail.memo}
                  </div>
                </Popover>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div css={S.pagination}>
          <Pagination
            page={page}
            count={5}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/dues?page=${item.page}`}
                {...item}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
