import { css } from '@emotion/react';

interface TimeSlotSelection {
  time: string;
  day: string;
}

interface SelectionRange {
  start: TimeSlotSelection;
  end: TimeSlotSelection;
}

interface SelectedCellProps {
  selectionRange: SelectionRange[];
  dragStart: TimeSlotSelection | null;
  dragEnd: TimeSlotSelection | null;
  time: string;
  day: string
}

export const weekContainer = css`
  width: 100%;
`;

export const buttonGroup = css`
  display: flex;
  position: relative;
  justify-content: space-around;
  width: 100%;
  height: 36px;
`;

export const prevWeekButton = css`
  position: absolute;
  left: 12%;
`;

export const nextWeekButton = css`
  position: absolute;
  right: 0;
`;

export const notDraggableArea = css`
  width: 50px;
  user-select: none;
  draggable: false;
  text-align: center;
`;

export const reservationTableRow = css`
  height: 50px;
`;

export const selectedCell = ({
  selectionRange, time, day, dragStart, dragEnd,
}: SelectedCellProps) => {
  const currentTimeInMinutes = Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
  const minute = time.split(':')[1];

  const isSelected = selectionRange.some(({ start, end }) => {
    const dayMatch = start.day === day && end.day === day;
    const startTimeInMinutes = Number(start.time.slice(0, 2)) * 60 + Number(start.time.slice(3));
    const endTimeInMinutes = Number(end.time.slice(0, 2)) * 60 + Number(end.time.slice(3));

    return dayMatch && ((startTimeInMinutes <= currentTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) || (endTimeInMinutes <= currentTimeInMinutes && currentTimeInMinutes <= startTimeInMinutes));
  });

  const isDragOver = dragStart && dragEnd && day === dragStart.day && day === dragEnd.day && (
    (Number(dragStart.time.slice(0, 2)) * 60 + Number(dragStart.time.slice(3)) <= currentTimeInMinutes && currentTimeInMinutes <= Number(dragEnd.time.slice(0, 2)) * 60 + Number(dragEnd.time.slice(3)))
    || (Number(dragEnd.time.slice(0, 2)) * 60 + Number(dragEnd.time.slice(3)) <= currentTimeInMinutes && currentTimeInMinutes <= Number(dragStart.time.slice(0, 2)) * 60 + Number(dragStart.time.slice(3))
    ));

  const baseStyle = css`
    position: relative;
    border: 0 solid #e0e0e0;
    border-left-width: 1px;
    border-right-width: 1px;
    padding: 2px;
    user-select: none;
  `;
  const borderStyle = css`
    position: relative;
    padding: 2px;
    user-select: none;
  `;

  if (isSelected || isDragOver) {
    return css`
      background-color: #0288d1;
      cursor: pointer;
      ${baseStyle}
    `;
  }
  if (minute === '50') {
    return css`
      border-bottom: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
      border-left: 1px solid #e0e0e0;
      background-color: transparent;
      ${borderStyle}
    `;
  }
  return css`
    background-color: transparent;
    ${baseStyle}
  `;
};

export const normalCell = css`
  background-color: #fff;
`;
