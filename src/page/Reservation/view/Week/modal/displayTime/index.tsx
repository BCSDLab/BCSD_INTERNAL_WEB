import * as S from './style';

interface DisplayTimeProps {
  startDateTime: string;
  endDateTime: string;
}

export default function DisplayTime({ startDateTime, endDateTime }: DisplayTimeProps) {
  const [endHourStr, endMinuteStr] = endDateTime.split(':');
  let endHour = Number(endHourStr);
  let endMinute = Number(endMinuteStr);
  endMinute += 10;
  if (endMinute >= 60) {
    endMinute -= 60;
    endHour += 1;
  }
  if (endHour >= 24) {
    endHour = 0;
  }
  const endTime = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
  return (
    <div css={S.displayTime}>
      <span>{`${startDateTime}~${endTime}`}</span>
    </div>
  );
}
