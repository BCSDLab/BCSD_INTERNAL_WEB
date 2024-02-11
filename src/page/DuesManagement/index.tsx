import { Link, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Button, Input } from '@mui/material';
import Modal from "@mui/material/Modal";
import { ChangeEvent, useState } from 'react';
import * as S from './style.ts';
import { useDues } from 'query/dues.ts';

interface Detail {
  month: number;
  status: "미납" | "납부" | "면제" | null;
  memo?: string;
}

interface Dues {
  memberId: number;
  name: string;
  track: string;
  unpaidCount: number;
  detail: Detail[];
}

interface DuesAndYear {
  year: number;
  dues: Dues[];
}

function createData({ year, dues }: DuesAndYear) {
  return { year, dues};
}

// 예시 데이터 
const rows =
  createData({
    year: 2023,
    dues: [{
      memberId: 1,
      name: '김도훈',
      track: "FRONTEND",
      unpaidCount: 3,
      detail: [
        { month: 1, status: "미납" },
        { month: 2, status: "미납" },
        { month: 3, status: "미납" },
        { month: 4, status: null },
        { month: 5, status: null },
        { month: 6, status: null },
      ]
    },
    {
      memberId: 1,
      name: '최준호',
      track: "BACKEND",
      unpaidCount: 2,
      detail: [
        { month: 1, status: "미납" },
        { month: 2, status: "미납" },
        { month: 3, status: "납부" },
        { month: 4, status: null },
        { month: 5, status: null },
        { month: 6, status: null },
      ]
    }]
  });

export default function DuesManagement() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const thisYear = new Date().getFullYear();
  const duesYear = thisYear - page + 1;
  const [filteredValue, setFilteredValue] = useState(rows.dues);
  const [track, setTrack] = useState([true, true, true, true, true, true]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // TODO: duesyear을 통해 API 가져오기 => API를 통해 rows 변수 초기화
  // const { dues } = useDues(duesYear);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value
    if (searchName === "") {
      setFilteredValue(rows.dues);
    }
    setName(searchName);
  }

  const handleNameSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      handleNameSearchClick();
    }
  }

  const handleNameSearchClick = () => {
    setFilteredValue(rows.dues.filter((row) => row.name.includes(name)));
  }

  const handleTrackFilterClick = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTrack = e.target.name;
    const trackIndex = ["FRONTEND", "BACKEND", "GAME", "ANDROID", "IOS", "UI/UX"].indexOf(selectedTrack);
    setTrack((prevTrack) => {
      const updatedTrack = [...prevTrack];
      updatedTrack[trackIndex] = !updatedTrack[trackIndex];
      setFilteredValue(rows.dues.filter((row) => updatedTrack[["FRONTEND", "BACKEND", "GAME", "ANDROID", "IOS", "UI/UX"].indexOf(row.track)]));
      return updatedTrack;
    });
  }
  return (
    <div css={S.container}>
      <h1>{duesYear}년 회비 내역</h1>
      <label htmlFor='memberName' css={S.searchName}>
        <Input
          value={name}
          id='memberName'
          onKeyDown={handleNameSearchKeyDown}
          onChange={handleNameChange}
          placeholder="이름을 입력하세요"
        />
        <Button onClick={handleNameSearchClick}>검색</Button>
      </label>
      <div css={S.dues}>
        <Paper>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    트랙
                    <button
                      type='button'
                      onClick={handleOpen}
                      css={S.filterModalButton}
                    >
                      필터
                    </button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <div css={S.filterModalContainer}>
                        <h2>
                          트랙 선택
                        </h2>
                        <div css={S.filterModalContent}>
                          <label htmlFor='FRONTEND'>
                            <input type='checkbox' id='FRONTEND' name='FRONTEND' onChange={handleTrackFilterClick}  checked={track[0]} />
                            <span>프론트엔드</span>
                          </label>
                          <label htmlFor='BACKEND'>
                            <input type='checkbox' id='BACKEND' name='BACKEND' onChange={handleTrackFilterClick} checked={track[1]} />
                            <span>백엔드</span>
                          </label>
                          <label htmlFor='GAME'>
                            <input type='checkbox' id='GAME' name='GAME' onChange={handleTrackFilterClick} checked={track[2]} />
                            <span>게임</span>
                          </label>
                          <label htmlFor='ANDROID'>
                            <input type='checkbox' id='ANDROID' name='ANDROID' onChange={handleTrackFilterClick} checked={track[3]} />
                            <span>안드로이드</span>
                          </label>
                          <label htmlFor='IOS'>
                            <input type='checkbox' id='IOS' name='IOS' onChange={handleTrackFilterClick} checked={track[4]} />
                            <span>IOS</span>
                          </label>
                          <label htmlFor='UI/UX'>
                            <input type='checkbox' id='UI/UX' name='UI/UX' onChange={handleTrackFilterClick} checked={track[5]} />
                            <span>UI/UX</span>
                          </label>
                        </div>
                      </div>
                    </Modal>
                  </TableCell>
                  <TableCell>미납 횟수</TableCell>
                  <TableCell sx={{minWidth: 80}}>이름</TableCell>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <TableCell key={month}>{month}월</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredValue.map((row) => (
                  <TableRow
                    key={row.name}
                  >
                    <TableCell component="th" scope="row">
                      {row.track}
                    </TableCell>
                    <TableCell>{row.unpaidCount}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    {row.detail.map((detail) => (
                      <TableCell key={detail.month}>{detail.status === "미납" ? "X" : "-"}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
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
  );
}
