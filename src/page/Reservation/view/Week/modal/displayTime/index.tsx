import * as S from './style';

interface TimeSlotSelection {
  timeFrom: string;
  timeTo: string;
  day: string;
}

interface DisplayTimeProps {
  startDateTime: TimeSlotSelection;
  endDateTime: TimeSlotSelection;
}

export default function DisplayTime({ startDateTime, endDateTime }: DisplayTimeProps) {
  const [startHourFrom, startMinuteFrom] = startDateTime.timeFrom.split(':').map(Number);
  const [endHourFrom, endMinuteFrom] = endDateTime.timeFrom.split(':').map(Number);
  const [startHourTo, startMinuteTo] = startDateTime.timeTo.split(':').map(Number);
  const [endHourTo, endMinuteTo] = endDateTime.timeTo.split(':').map(Number);
  // 드래그를 아래로 할 때
  if (startHourFrom < endHourTo || (startHourFrom === endHourTo && startMinuteFrom < endMinuteTo)) {
    return (
      <div css={S.displayTime}>
        <span>{`${startDateTime.timeFrom}~${endDateTime.timeTo}`}</span>
      </div>
    );
  }

  if (startHourTo > endHourFrom || (startHourTo === endHourFrom && startMinuteTo > endMinuteFrom)) {
    return (
      <div css={S.displayTime}>
        <span>{`${endDateTime.timeFrom}~${startDateTime.timeTo}`}</span>
      </div>
    );
  }
}
