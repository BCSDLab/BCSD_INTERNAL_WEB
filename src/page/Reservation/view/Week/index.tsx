import {
  Button,
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import {
  useEffect, useState, Fragment, useRef,
} from 'react';
import { HOUR_LIST, MINUTE_LIST } from 'util/constants/time';
import makeNumberArray from 'util/hooks/makeNumberArray';
import { useGetReservations } from 'query/reservations';
import useBooleanState from 'util/hooks/useBooleanState';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import * as S from './styles';
import CreateReservationModal from './modal/createReservationModal';
import DisplayTime from './modal/displayTime';
import ModifyReservationModal from './modal/modifyReservationModal';

interface WeekDay {
  dayOfWeek: string;
  date: string;
}

interface TimeSlotSelection {
  time: string;
  day: string;
}

interface SelectionRange {
  start: TimeSlotSelection;
  end: TimeSlotSelection;
}

interface ModifyReservationModalProps {
  hour: string;
  minute: string;
  dayIndex: number;
}

interface WeekProps {
  setDate: (date: { year: number; month: number }) => void;
}

export default function Week({ setDate }: WeekProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const difference = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    today.setDate(today.getDate() - difference);
    return new Date(today.setHours(0, 0, 0, 0));
  });
  const currentYear = new Date().getFullYear();
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
    const [startHour, startMinute] = dragStart.time.split(':').map(Number);
    let [endHour, endMinute] = dragEnd.time.split(':').map(Number);
    endMinute += 10;
    if (endMinute >= 60) {
      endMinute -= 60;
      endHour += 1;
    }
    if (endHour >= 24) {
      endHour = 0;
    }
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    const newEndTime = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
    if (startTime <= endTime) {
      startDateTime.current = `${currentYear}-${dragStart.day} ${dragStart.time}`;
      endDateTime.current = `${currentYear}-${dragEnd.day} ${newEndTime}`;
    } else {
      startDateTime.current = `${currentYear}-${dragEnd.day} ${newEndTime}`;
      endDateTime.current = `${currentYear}-${dragStart.day} ${dragStart.time}`;
    }
  }, [dragStart, dragEnd, currentYear]);

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
    setDate({ year: currentWeekStart.getFullYear(), month: Number(dates[0].date.split('-')[0]) });
    setWeekDates(dates);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeekStart]);

  const goToPrevWeek = () => {
    setCurrentWeekStart(new Date(currentWeekStart.setDate(currentWeekStart.getDate() - 7)));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(new Date(currentWeekStart.setDate(currentWeekStart.getDate() + 7)));
  };

  const handleMouseDown = ({ time, day }: TimeSlotSelection) => {
    setDragging(true);
    setDragStart({ time, day });
  };

  const handleMouseEnter = ({ time, day }: TimeSlotSelection) => {
    if (dragging) {
      setDragEnd({ time, day });
    }
  };

  const handleMouseUp = () => {
    if (!dragStart || !dragEnd || dragStart.day !== dragEnd.day) {
      setDragging(false);
      return;
    }
    const [startHour, startMinute] = dragStart.time.split(':').map(Number);
    const [endHour, endMinute] = dragEnd.time.split(':').map(Number);
    if (startHour < endHour || (startHour === endHour && startMinute <= endMinute)) {
      setSelectionRange((prev) => [...prev, { start: dragStart, end: dragEnd }]);
    } else {
      setSelectionRange((prev) => [...prev, { start: dragEnd, end: dragStart }]);
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

  const handleModifyReservationModalOpen = ({ hour, minute, dayIndex }: ModifyReservationModalProps) => {
    const isSelected = selectionRange.some(({ start, end }) => {
      const startTimeInMinutes = Number(start.time.slice(0, 2)) * 60 + Number(start.time.slice(3));
      const endTimeInMinutes = Number(end.time.slice(0, 2)) * 60 + Number(end.time.slice(3));
      const currentTimeInMinutes = Number(`${hour}:${minute}`.slice(0, 2)) * 60 + Number(`${hour}:${minute}`.slice(3));
      return start.day === weekDates[dayIndex]?.date && end.day === weekDates[dayIndex]?.date && ((startTimeInMinutes <= currentTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) || (endTimeInMinutes <= currentTimeInMinutes && currentTimeInMinutes <= startTimeInMinutes));
    });

    const reservationInfoIndex = selectionRange.findIndex(({ start, end }) => {
      const startTimeInMinutes = Number(start.time.slice(0, 2)) * 60 + Number(start.time.slice(3));
      const endTimeInMinutes = Number(end.time.slice(0, 2)) * 60 + Number(end.time.slice(3));
      const currentTimeInMinutes = Number(`${hour}:${minute}`.slice(0, 2)) * 60 + Number(`${hour}:${minute}`.slice(3));
      return start.day === weekDates[dayIndex]?.date && end.day === weekDates[dayIndex]?.date && ((startTimeInMinutes <= currentTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) || (endTimeInMinutes <= currentTimeInMinutes && currentTimeInMinutes <= startTimeInMinutes));
    });
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
                {MINUTE_LIST.map((minute, minuteIndex) => {
                  if (minuteIndex === 0) {
                    return (
                      <TableRow key={hour}>
                        <TableCell css={S.notDraggableArea} rowSpan={6}>
                          {hour}
                          :00
                        </TableCell>
                        {makeNumberArray(7).map((dayIndex) => (
                          <TableCell
                            key={`${dayIndex}-${hour}-${minute}`}
                            onMouseDown={() => handleMouseDown({ time: `${hour}:${minute}`, day: weekDates[dayIndex]?.date })}
                            onMouseEnter={() => handleMouseEnter({ time: `${hour}:${minute}`, day: weekDates[dayIndex]?.date })}
                            onMouseUp={handleMouseUp}
                            onClick={() => handleModifyReservationModalOpen({ hour, minute, dayIndex })}
                            css={S.selectedCell({
                              selectionRange, time: `${hour}:${minute}`, day: weekDates[dayIndex]?.date, dragStart, dragEnd,
                            })}
                          >
                            {dragStart && dragStart.day === weekDates[dayIndex]?.date && dragStart.time === `${hour}:${minute}` && dragEnd && (
                              <DisplayTime startDateTime={dragStart.time} endDateTime={dragEnd.time} />
                            )}
                            {selectionRange.map(({ start, end }, reservationInfoIndex) => {
                              if (start.time === `${hour}:${minute}` && start.day === weekDates[dayIndex]?.date) {
                                return <DisplayTime startDateTime={start.time} endDateTime={end.time} reason={reservationInfo[reservationInfoIndex]?.detailedReason} />;
                              }
                              return null;
                            })}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  }
                  return (
                    <TableRow key={`${hour}:${minute}`}>
                      {makeNumberArray(7).map((dayIndex) => (
                        <TableCell
                          key={`${dayIndex}-${hour}-${minute}`}
                          onMouseDown={() => handleMouseDown({ time: `${hour}:${minute}`, day: weekDates[dayIndex]?.date })}
                          onMouseEnter={() => handleMouseEnter({ time: `${hour}:${minute}`, day: weekDates[dayIndex]?.date })}
                          onMouseUp={handleMouseUp}
                          onClick={() => handleModifyReservationModalOpen({ hour, minute, dayIndex })}
                          css={S.selectedCell({
                            selectionRange, time: `${hour}:${minute}`, day: weekDates[dayIndex]?.date, dragStart, dragEnd,
                          })}
                        >
                          {dragStart && dragStart.day === weekDates[dayIndex]?.date && dragStart.time === `${hour}:${minute}` && dragEnd && (
                            <DisplayTime startDateTime={dragStart.time} endDateTime={dragEnd.time} />
                          )}
                          {selectionRange.map(({ start, end }, reservationInfoIndex) => {
                            if (start.time === `${hour}:${minute}` && start.day === weekDates[dayIndex]?.date) {
                              return <DisplayTime startDateTime={start.time} endDateTime={end.time} reason={reservationInfo[reservationInfoIndex]?.detailedReason} />;
                            }
                            return null;
                          })}
                        </TableCell>
                      ))}
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
