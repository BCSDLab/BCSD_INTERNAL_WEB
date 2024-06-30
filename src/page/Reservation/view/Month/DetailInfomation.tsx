import { Reservations } from 'model/reservations';
import { Button } from '@mui/material';
import { useDeleteEvent } from 'page/Reservation/hook/useDeleteEvent';
import * as S from './style';

interface DetailInformationProps extends Reservations {
  // eslint-disable-next-line
  eventId?: string | undefined;
  // eslint-disable-next-line
  passed?: boolean;
  memberName: string;
}

export default function DetailInfomation({
  detailedReason, startDateTime, endDateTime, memberCount, eventId, reason, memberName, passed,
}: DetailInformationProps) {
  const { mutate } = useDeleteEvent();

  return (
    <div css={S.Detail}>
      <div css={S.DetailContainer}>
        <div>
          <div>
            {startDateTime.slice(0, 10)}
          </div>
          <div>
            예약자명 :
            {' '}
            {memberName}
          </div>
          <div>
            시간 :
            {' '}
            {startDateTime.slice(11, 16)}
            {' '}
            ~
            {' '}
            {endDateTime.slice(11, 16)}
          </div>
          <div>
            정보 :
            {' '}
            {reason}
          </div>
          <div>
            상세정보 :
            {' '}
            {detailedReason}
          </div>
          <div>
            인원 :
            {' '}
            {memberCount}
          </div>
        </div>
        {
          eventId && !passed && (
            <Button variant="outlined" color="error" onClick={() => mutate(eventId)}>
              취소
            </Button>
          )
        }
      </div>
    </div>
  );
}
