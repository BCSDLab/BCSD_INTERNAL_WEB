import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button,
} from '@mui/material';
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { useGetReservations } from 'query/reservations';
import { Reservations } from 'model/reservations';
import { useEffect, useState } from 'react';
import * as S from './style';
// eslint-disable-next-line import/no-cycle
import MonthModal from './Month/MonthModal';
import MyReservation from './Month/MyReservation';

type Calendar = {
  day: number | null,
  date: number | null,
  today: string | null,
};

type Calendars = Calendar[];

export type CalendarContent = {
  data: Reservations[],
  date: number | null,
  today: string | null,
  currentMonth: number,
};

function CalendarCell({
  date, today, data, currentMonth,
}: CalendarContent) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const filteredData = data.filter((item) => item.startDateTime.slice(0, 10) === today);

  return (
    <>
      <TableCell
        css={S.Cell(currentMonth === new Date().getMonth() && date === new Date().getDate())}
        onClick={() => date && handleOpen()}
      >
        <div css={S.Date(currentMonth === new Date().getMonth() && date === new Date().getDate())}>
          {date}
        </div>
        <div css={S.scheduleContent}>
          {date && filteredData.map((item, index) => (
            <p css={S.schedule(index)}>
              {item.startDateTime.slice(10, 20)}
              {' '}
              {item.reason}
            </p>
          ))}
        </div>
      </TableCell>
      <MonthModal today={today} date={date} data={filteredData} handleClose={handleClose} open={open} currentMonth={currentMonth} />
    </>
  );
}

// 각 요일 구하기
const getCurrentDay = (currentYear: number, currentMonth: number, day: number) => {
  return new Date(currentYear, currentMonth, day).getDay();
};

const emptySpace = (calendars: Calendars) => {
  if (calendars[0].day) {
    const length = calendars[0].day;
    for (let i = 0; i < length; i += 1) {
      calendars.unshift({ day: null, date: null, today: null });
    }
  }
};

const chunkArray = (arr: Calendars, chunkSize: number) => {
  const result: Calendars[] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

export default function Month() {
  const { data } = useGetReservations();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentCalendar, setCurrentCalendar] = useState<Calendars[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);
  const nextYear = () => setCurrentYear((prev) => prev + 1);
  const nextMonth = () => setCurrentMonth((prev) => (prev + 1) % 12);
  const previousYear = () => setCurrentYear((prev) => prev - 1);
  const previousMonth = () => setCurrentMonth((prev) => {
    if ((prev - 1) >= 0) return (prev - 1) % 12;
    return 11;
  });

  useEffect(() => {
    // 현재 월의 일 수
    const currentMonthDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendar = Array.from({ length: currentMonthDate }, (_, i) => {
      const index = i + 1;
      const obj: Calendar = {
        day: getCurrentDay(currentYear, currentMonth, index),
        date: index,
        today: new Date(currentYear, currentMonth, index + 1).toISOString().slice(0, 10),
      };

      return obj;
    });

    emptySpace(calendar);
    const weeklyCalendar = chunkArray(calendar, 7);

    setCurrentCalendar(weeklyCalendar);
  }, [currentMonth, currentYear]);

  return (
    <TableContainer>
      <div css={S.AlignItems}>
        <Button onClick={previousYear}>
          <ArrowBackIosNewOutlined />
        </Button>
        <div css={S.current}>{`${currentYear}년`}</div>
        <Button onClick={nextYear}>
          <ArrowForwardIosOutlined />
        </Button>
        <Button onClick={previousMonth}>
          <ArrowBackIosNewOutlined />
        </Button>
        <div css={S.current}>{`${currentMonth + 1}월`}</div>
        <Button onClick={nextMonth}>
          <ArrowForwardIosOutlined />
        </Button>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          예약 확인
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">일요일</TableCell>
            <TableCell align="center">월요일</TableCell>
            <TableCell align="center">화요일</TableCell>
            <TableCell align="center">수요일</TableCell>
            <TableCell align="center">목요일</TableCell>
            <TableCell align="center">금요일</TableCell>
            <TableCell align="center">토요일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentCalendar.map((week) => (
            <TableRow sx={{ width: '100%' }}>
              {week.map((day) => (
                <CalendarCell today={day.today} date={day.date} data={data} currentMonth={currentMonth} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <MyReservation open={open} handleClose={handleClose} />
    </TableContainer>
  );
}
