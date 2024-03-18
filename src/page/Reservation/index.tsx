import LoadingSpinner from 'layout/LoadingSpinner';
import { Suspense } from 'react';

function ReservationOutlet() {
  return (
    <div>
      <h1>Reservation</h1>
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
