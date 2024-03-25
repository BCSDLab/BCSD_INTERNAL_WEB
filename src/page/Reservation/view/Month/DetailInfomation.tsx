import { Reservations } from 'model/reservations';
import { Button } from '@mui/material';
import { useDeleteReservations } from 'query/reservations';
import * as S from './style';

interface DetailInfomationProps extends Reservations {
  // eslint-disable-next-line
  id?: number;
}

export default function DetailInfomation({
  detailedReason, startDateTime, endDateTime, memberCount, id, reason,
}: DetailInfomationProps) {
  const { mutate } = useDeleteReservations();
  return (
    <div css={S.Detail}>
      <div css={S.DetailContainer}>
        <div>
          <div>
            시간 :
            {startDateTime.slice(10, 20)}
            {' '}
            ~
            {' '}
            {endDateTime.slice(10, 20)}
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
          id && (
            <Button variant="outlined" color="error" onClick={() => mutate(id)}>
              취소
            </Button>
          )
        }
      </div>
    </div>
  );
}
