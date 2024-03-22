import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
// import * as S from './style';

type Calendar = {
  day: number | null,
  date: number | null,
}[];

const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();

// 각 요일 구하기
const getCurrentDay = (day: number) => {
  return new Date(currentYear, currentMonth, day).getDay();
};

// 현재 월의 일 수
const currentMonthDate = new Date(currentYear, currentMonth + 1, 0).getDate();
const calendar = Array.from({ length: currentMonthDate }, (_, i) => {
  const obj = {
    day: getCurrentDay(i),
    date: i + 1,
  };

  return obj;
});

const emptySpace = (calendars: Calendar) => {
  if (calendars[0].day) {
    const length = calendars[0].day;
    for (let i = 0; i < length; i += 1) {
      calendars.unshift({ day: null, date: null });
    }
  }
};
emptySpace(calendar);
console.log(calendar);

const chunkArray = (arr: Calendar, chunkSize: number) => {
  const result: Calendar[] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

const weeklyCalendar = chunkArray(calendar, 7);

export default function Month() {
  return (
    <TableContainer>
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
          {weeklyCalendar.map((week, weekIndex) => (
            <TableRow key={week[weekIndex].date}>
              {week.map((day) => (
                <TableCell key={day.day}>{day.date}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
