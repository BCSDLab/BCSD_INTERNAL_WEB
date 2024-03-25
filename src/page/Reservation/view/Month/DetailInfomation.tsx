import { Reservations } from 'model/reservations';
import * as S from './style';

export default function DetailInfomation({
  detailedReason, startDateTime, endDateTime, memberCount,
}: Reservations) {
  return (
    <div css={S.Detail}>
      <div>
        시간 :
        {startDateTime.slice(10, 20)}
        {' '}
        ~
        {' '}
        {endDateTime.slice(10, 20)}
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
  );
}
