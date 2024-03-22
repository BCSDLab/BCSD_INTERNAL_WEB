import {
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { TIME_LIST } from 'util/constants/time';

export default function Week() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>시간</TableCell>
          <TableCell>월요일</TableCell>
          <TableCell>화요일</TableCell>
          <TableCell>수요일</TableCell>
          <TableCell>목요일</TableCell>
          <TableCell>금요일</TableCell>
          <TableCell>토요일</TableCell>
          <TableCell>일요일</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {TIME_LIST.map((time) => (
          <TableRow key={time}>
            <TableCell>{time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
