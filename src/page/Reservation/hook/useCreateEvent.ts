import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Reservation } from 'model/reservations';
import { createEvent } from 'ts/googleapi';
import { useSnackBar } from 'ts/useSnackBar';
import { useDateStore } from '../store/dateStore';

export const useCreateEvents = () => {
  const queryClient = useQueryClient();
  const snackBar = useSnackBar();
  const { currentMonth, currentYear } = useDateStore();
  const mutate = useMutation({
    mutationFn: (reservation: Reservation) => createEvent(reservation),
    onError: (e) => snackBar({ type: 'error', message: e.message }),
    onSuccess: () => {
      snackBar({ type: 'success', message: '예약했습니다! 즐겁게 사용해주세요' });
      queryClient.invalidateQueries({ queryKey: ['calender', currentMonth, currentYear] });
    },
  });

  return mutate;
};
