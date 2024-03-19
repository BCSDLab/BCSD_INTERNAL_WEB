import { Button, ButtonGroup } from '@mui/material';
import LoadingSpinner from 'layout/LoadingSpinner';
import { Suspense } from 'react';
import Week from './view/Week';

function ReservationOutlet() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  return (
    <div>
      <ButtonGroup>
        <Button>월</Button>
        <Button>주</Button>
      </ButtonGroup>
      {/* 주를 만들자 */}
      <Week />
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
