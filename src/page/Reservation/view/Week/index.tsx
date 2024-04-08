import {
  Button,
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import {
  useEffect, useState, Fragment, useRef,
} from 'react';
import { HOUR_LIST, MINUTE_RANGE_LIST } from 'util/constants/time';
import makeNumberArray from 'util/hooks/makeNumberArray';
import { useGetReservations } from 'query/reservations';
import useBooleanState from 'util/hooks/useBooleanState';
import { useSnackBar } from 'ts/useSnackBar';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import * as S from './styles';
import CreateReservationModal from './modal/createReservationModal';
import DisplayTimeAndReason from './modal/displayTimeAndReason';
import ModifyReservationModal from './modal/modifyReservationModal';
import DisplayTime from './modal/displayTime';

interface WeekDay {
  dayOfWeek: string;
  date: string;
}

interface TimeSlotSelection {
  timeFrom: string;
  timeTo: string;
  day: string;
}

interface TimeAndDay {
  time: string;
  day: string;
}

interface SelectionRange {
  start: TimeAndDay;
  end: TimeAndDay;
}

interface ModifyReservationModalProps {
  dayIndex: number;
  day: string;
  timeFrom: string;
  timeTo: string;
}

interface WeekProps {
  currentDate: { year: number; month: number };
  setCurrentDate: (date: { year: number; month: number }) => void;
}

export default function Week({ currentDate, setCurrentDate }: WeekProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const difference = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    today.setDate(today.getDate() - difference);
    return new Date(today.setHours(0, 0, 0, 0));
  });
  const selectedYear = currentDate.year;
  const [weekDates, setWeekDates] = useState<WeekDay[]>([]);
  const [dragStart, setDragStart] = useState<TimeSlotSelection | null>(null);
  const [dragEnd, setDragEnd] = useState<TimeSlotSelection | null>(null);
  const [dragging, setDragging] = useState(false);
  const [selectionRange, setSelectionRange] = useState<SelectionRange[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const { value: isReservationModalOpen, setTrue: openReservationModal, setFalse: closeReservationModal } = useBooleanState();
  const { value: isModifyReservationModalOpen, setTrue: openModifyReservationModal, setFalse: closeModifyReservationModal } = useBooleanState();
  const { data: reservationInfo, refetch } = useGetReservations();
  const startDateTime = useRef<string>('');
  const endDateTime = useRef<string>('');
  const openSnackBar = useSnackBar();

  // 예약 정보가 변경될 때마다 선택된 범위를 업데이트
  useEffect(() => {
    if (!reservationInfo) return;
    const newSelectionRange: SelectionRange[] = reservationInfo.map((reservation) => {
      const [startDate, startTime] = reservation.startDateTime.split(' ');
      const [endDate, endTime] = reservation.endDateTime.split(' ');
      const start = {
        time: startTime,
        day: `${startDate.split('-')[1]}-${startDate.split('-')[2]}`,
      };
      const end = {
        time: endTime,
        day: `${endDate.split('-')[1]}-${endDate.split('-')[2]}`,
      };
      return { start, end };
    });
    setSelectionRange(newSelectionRange);
  }, [reservationInfo]);

  // 드래그한 범위의 시작 시간과 종료 시간을 정렬
  useEffect(() => {
    if (!dragStart || !dragEnd) return;
    const [startHourFrom, startMinuteFrom] = dragStart.timeFrom.split(':').map(Number);
    const [startHourTo, startMinuteTo] = dragStart.timeTo.split(':').map(Number);
    const [endHourFrom, endMinuteFrom] = dragEnd.timeFrom.split(':').map(Number);
    const [endHourTo, endMinuteTo] = dragEnd.timeTo.split(':').map(Number);
    if (startHourFrom < endHourTo || ((startHourFrom === endHourTo) && (startMinuteFrom <= endMinuteTo))) {
      startDateTime.current = `${selectedYear}-${dragStart.day} ${dragStart.timeFrom}`;
      endDateTime.current = `${selectedYear}-${dragEnd.day} ${dragEnd.timeTo}`;
    } else if (endHourFrom < startHourTo || ((endHourFrom === startHourTo) && (endMinuteFrom <= startMinuteTo))) {
      startDateTime.current = `${selectedYear}-${dragEnd.day} ${dragEnd.timeFrom}`;
      endDateTime.current = `${selectedYear}-${dragStart.day} ${dragStart.timeTo}`;
    }
  }, [dragStart, dragEnd, selectedYear]);

  // 현재 주의 날짜 목록을 업데이트
  useEffect(() => {
    const dates: WeekDay[] = makeNumberArray(7).map((_, i) => {
      const date = new Date(currentWeekStart);
      date.setDate(date.getDate() + i);
      return {
        dayOfWeek: ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
        date: `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
      };
    });
    setCurrentDate({ year: currentWeekStart.getFullYear(), month: Number(dates[0].date.split('-')[0]) });
    setWeekDates(dates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeekStart]);

  const goToPrevWeek = () => {
    setCurrentWeekStart(new Date(currentWeekStart.setDate(currentWeekStart.getDate() - 7)));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(new Date(currentWeekStart.setDate(currentWeekStart.getDate() + 7)));
  };
  // 오늘 날짜 기준으로 이전 날짜는 선택 불가능하게 만들어야 함
  const handleMouseDown = ({ timeFrom, timeTo, day }: TimeSlotSelection) => {
    setDragging(true);
    setDragStart({ timeFrom, timeTo, day });
  };

  const handleMouseEnter = ({ timeFrom, timeTo, day }: TimeSlotSelection) => {
    if (dragging) {
      const fixedDay = dragStart?.day;
      if (!fixedDay) return;
      if (new Date(`${selectedYear}-${day} ${timeTo}`) < new Date()) {
        openSnackBar({ type: 'error', message: '지난 시간은 선택할 수 없습니다.' });
        return;
      }
      setDragEnd({ timeFrom, timeTo, day: fixedDay });
    }
  };

  const handleMouseUp = () => {
    if (!dragStart || !dragEnd || dragStart.day !== dragEnd.day) {
      setDragging(false);
      return;
    }
    const [startHourFrom, startMinuteFrom] = dragStart.timeFrom.split(':').map(Number);
    const [startHourTo, startMinuteTo] = dragStart.timeTo.split(':').map(Number);
    const [endHourFrom, endMinuteFrom] = dragEnd.timeFrom.split(':').map(Number);
    const [endHourTo, endMinuteTo] = dragEnd.timeTo.split(':').map(Number);
    // 위에서 아래로 드래그를 할 때, else if는 아래에서 위로 드래그할 때
    if (startHourFrom < endHourTo || ((startHourFrom === endHourTo) && (startMinuteFrom <= endMinuteTo))) {
      setSelectionRange((prev) => [...prev, { start: { time: dragStart.timeFrom, day: dragStart.day }, end: { time: dragEnd.timeTo, day: dragEnd.day } }]);
    } else if (endHourFrom < startHourTo || ((endHourFrom === startHourTo) && (endMinuteFrom <= startMinuteTo))) {
      setSelectionRange((prev) => [...prev, { start: { time: dragEnd.timeFrom, day: dragEnd.day }, end: { time: dragStart.timeTo, day: dragStart.day } }]);
    }
    setDragging(false);
    setDragStart(null);
    setDragEnd(null);
    openReservationModal();
  };

  const handleReservationModalClose = () => {
    setSelectionRange((prev) => prev.slice(0, -1));
    closeReservationModal();
  };

  const handleModifyReservationModalOpen = ({
    dayIndex, day, timeFrom, timeTo,
  }: ModifyReservationModalProps) => {
    const isSelected = selectionRange.some(({ start, end }) => {
      const startTime = Number(start.time.slice(0, 2)) * 60 + Number(start.time.slice(3));
      const endTime = Number(end.time.slice(0, 2)) * 60 + Number(end.time.slice(3));
      const currentTimeFrom = Number(timeFrom.slice(0, 2)) * 60 + Number(timeFrom.slice(3));
      const currentTimeTo = Number(timeTo.slice(0, 2)) * 60 + Number(timeTo.slice(3));
      return start.day === weekDates[dayIndex]?.date && end.day === weekDates[dayIndex]?.date
        && ((startTime <= currentTimeFrom && currentTimeTo <= endTime)
          || (endTime <= currentTimeFrom && currentTimeTo <= startTime));
    });

    const reservationInfoIndex = selectionRange.findIndex(({ start, end }) => {
      const startTimeInMinutes = Number(start.time.slice(0, 2)) * 60 + Number(start.time.slice(3));
      const endTimeInMinutes = Number(end.time.slice(0, 2)) * 60 + Number(end.time.slice(3));
      const currentTimeInMinutesFrom = Number(timeFrom.slice(0, 2)) * 60 + Number(timeFrom.slice(3));
      const currentTimeInMinutesTo = Number(timeTo.slice(0, 2)) * 60 + Number(timeTo.slice(3));
      return start.day === weekDates[dayIndex]?.date && end.day === weekDates[dayIndex]?.date
        && (((startTimeInMinutes <= currentTimeInMinutesFrom) && (currentTimeInMinutesTo <= endTimeInMinutes))
          || ((endTimeInMinutes <= currentTimeInMinutesTo) && (currentTimeInMinutesFrom <= startTimeInMinutes)));
    });
    if (!isSelected && new Date(`${selectedYear}-${day} ${timeTo}`) < new Date()) {
      openSnackBar({ type: 'error', message: '지난 시간은 선택할 수 없습니다.' });
      return;
    }
    if (isSelected) {
      setSelectedIndex(reservationInfoIndex);
      openModifyReservationModal();
    }
  };

  return (
    <div css={S.weekContainer}>
      <div css={S.buttonGroup}>
        <Button css={S.prevWeekButton} onClick={goToPrevWeek}>
          <ArrowBackIosOutlined />
        </Button>
        <Button css={S.nextWeekButton} onClick={goToNextWeek}>
          <ArrowForwardIosOutlined />
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell css={S.notDraggableArea}>시간</TableCell>
            {weekDates.map((weekDay) => (
              <TableCell key={weekDay.dayOfWeek} css={S.notDraggableArea}>
                {weekDay.dayOfWeek}
                <br />
                {weekDay.date}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {HOUR_LIST.map((hour) => {
            return (
              <Fragment key={hour}>
                {MINUTE_RANGE_LIST.map((minute, minuteIndex) => {
                  const [minuteFrom, minuteTo] = minute.split('-');
                  const timeFrom = `${hour}:${minuteFrom}`;
                  let timeTo = '';
                  if (minuteTo === '00') {
                    timeTo = `${(Number(hour) + 1).toString().padStart(2, '0')}:${minuteTo}`;
                  } else {
                    timeTo = `${hour}:${minuteTo}`;
                  }
                  if (minuteIndex === 0) {
                    return (
                      <TableRow key={hour}>
                        <TableCell css={S.notDraggableArea} rowSpan={6}>
                          {hour}
                          :00
                        </TableCell>
                        {makeNumberArray(7).map((dayIndex) => {
                          const day = weekDates[dayIndex]?.date;
                          return (
                            <TableCell
                              key={`${dayIndex}-${timeTo}`}
                              onMouseDown={() => handleMouseDown({ timeFrom, timeTo, day })}
                              onMouseEnter={() => handleMouseEnter({ timeFrom, timeTo, day })}
                              onMouseUp={handleMouseUp}
                              onClick={() => handleModifyReservationModalOpen({
                                dayIndex, day, timeFrom, timeTo,
                              })}
                              css={S.selectedCell({
                                selectionRange, timeFrom, timeTo, day, dragStart, dragEnd,
                              })}
                            >
                              {dragStart && dragStart.day === day && dragStart.timeFrom === timeFrom && dragStart.timeTo === timeTo && dragEnd && (
                                <DisplayTime startDateTime={dragStart} endDateTime={dragEnd} />
                              )}
                              {selectionRange.map(({ start, end }, reservationInfoIndex) => {
                                if (start.time === timeFrom && start.day === day) {
                                  return <DisplayTimeAndReason startDateTime={start.time} endDateTime={end.time} reason={reservationInfo[reservationInfoIndex]?.detailedReason} />;
                                }
                                return null;
                              })}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  }
                  return (
                    <TableRow key={timeFrom}>
                      {makeNumberArray(7).map((dayIndex) => {
                        const day = weekDates[dayIndex]?.date;
                        return (
                          <TableCell
                            key={`${dayIndex}-${timeFrom}`}
                            onMouseDown={() => handleMouseDown({ timeFrom, timeTo, day })}
                            onMouseEnter={() => handleMouseEnter({ timeFrom, timeTo, day })}
                            onMouseUp={handleMouseUp}
                            onClick={() => handleModifyReservationModalOpen({
                              dayIndex, day, timeFrom, timeTo,
                            })}
                            css={S.selectedCell({
                              selectionRange, timeFrom, timeTo, day, dragStart, dragEnd,
                            })}
                          >
                            {dragStart && dragStart.day === day && dragStart.timeFrom === timeFrom && dragEnd && (
                              <DisplayTime startDateTime={dragStart} endDateTime={dragEnd} />
                            )}
                            {selectionRange.map(({ start, end }, reservationInfoIndex) => {
                              if (start.time === timeFrom && start.day === day) {
                                return <DisplayTimeAndReason startDateTime={start.time} endDateTime={end.time} reason={reservationInfo[reservationInfoIndex]?.detailedReason} />;
                              }
                              return null;
                            })}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
      {startDateTime.current && endDateTime.current && !dragging && (
        <CreateReservationModal open={isReservationModalOpen} onClose={handleReservationModalClose} startDateTime={startDateTime.current} endDateTime={endDateTime.current} refetch={refetch} />
      )}
      {!dragging && (
        <ModifyReservationModal open={isModifyReservationModalOpen} onClose={closeModifyReservationModal} reservationInfoIndex={selectedIndex} refetch={refetch} />
      )}
    </div>
  );
}
