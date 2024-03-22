import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { getReservations, postReservations } from 'api/reservations';
import { AxiosError } from 'axios';
import { Reservations } from 'model/reservations';
import { useSnackBar } from 'ts/useSnackBar';

export const useGetReservations = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['reservations'],
    queryFn: () => getReservations(),
  });
  return { data };
};

export const useCreateReservations = () => {
  const openSnackBar = useSnackBar();
  const { mutate } = useMutation({
    mutationFn: (data: Reservations) => postReservations(data),
    onSuccess: () => {
      openSnackBar({ type: 'success', message: '예약이 완료되었습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data });
      }
    },
  });
  return { mutate };
};
