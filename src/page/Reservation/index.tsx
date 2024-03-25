import { Button, ButtonGroup } from '@mui/material';
import LoadingSpinner from 'layout/LoadingSpinner';
import { Suspense, useState } from 'react';
import Week from './view/Week';
import Month from './view/Month';
import * as S from './style';

function ReservationOutlet() {
  const [mode, setMode] = useState('week');
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  return (
    <div css={S.reservation}>
      <h2 css={S.currentTimeTitle}>{`${currentYear}년 ${currentMonth}월`}</h2>
      <ButtonGroup css={S.buttonGroup}>
        <Button
          onClick={() => setMode('month')}
          variant={mode === 'month' ? 'contained' : 'outlined'}
          css={S.modeButton}
        >
          월
        </Button>
        <Button
          onClick={() => setMode('week')}
          variant={mode === 'week' ? 'contained' : 'outlined'}
          css={S.modeButton}
        >
          주
        </Button>
      </ButtonGroup>
      {/* 주를 만들자 */}
      {mode === 'week' && <Week />}
      {mode === 'month' && <div>월</div>}
    </div>
  );
}

export default function Reservation() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ReservationOutlet />
    </Suspense>
  );
}
