import * as S from './style';

interface DisplayTimeProps {
  startDateTime: string;
  endDateTime: string;
  reason?: string;
}

export default function DisplayTimeAndReason({ startDateTime, endDateTime, reason = '' }: DisplayTimeProps) {
  const [startHour, startMinute] = startDateTime.split(':').map(Number);
  let [endHour, endMinute] = endDateTime.split(':').map(Number);
  if (endMinute >= 60) {
    endMinute -= 60;
    endHour += 1;
  }
  if (endHour >= 24) {
    endHour = 0;
  }
  const startTimeStr = `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
  const endTimeStr = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
  const startTime = startHour * 60 + startMinute;
  const endTime = endHour * 60 + endMinute;
  if (startTime >= endTime) {
    return (
      <div css={S.displayTime}>
        <span>{`${endTimeStr}~${startTimeStr}`}</span>
      </div>
    );
  }

  return (
    <div css={S.displayTime}>
      <span>{`${startTimeStr}~${endTimeStr}`}</span>
      <span>{reason}</span>
    </div>
  );
}

DisplayTimeAndReason.defaultProps = {
  reason: '',
};
