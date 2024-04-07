import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
  deleteReservations, getReservations, postReservations, putReservations, myReservation,
} from 'api/reservations';
import { AxiosError } from 'axios';
import { Reservations } from 'model/reservations';
import { useSnackBar } from 'ts/useSnackBar';

interface PutReservations {
  id: number
  data: Reservations
}

export const useGetReservations = () => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['reservations'],
    queryFn: () => getReservations(),
  });
  return { data, refetch };
};

export const useCreateReservations = () => {
  const openSnackBar = useSnackBar();
  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['postReservations'],
    mutationFn: (data: Reservations) => postReservations(data),
    onSuccess: () => {
      openSnackBar({ type: 'success', message: '예약이 완료되었습니다.' });
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
  return { mutate, isSuccess };
};

export const useDeleteReservations = () => {
  const openSnackBar = useSnackBar();
  const queryClient = useQueryClient();
  const { mutate, isSuccess } = useMutation({
    mutationKey: ['deleteReservations'],
    mutationFn: (id: number) => deleteReservations(id),
    onSuccess: () => {
      openSnackBar({ type: 'success', message: '예약이 취소되었습니다.' });
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
  return { mutate, isSuccess };
};

export const usePutReservations = () => {
  const openSnackBar = useSnackBar();
  const { mutate, isSuccess } = useMutation({
    mutationKey: ['putReservations'],
    mutationFn: ({ id, data }: PutReservations) => putReservations(id, data),
    onSuccess: () => {
      openSnackBar({ type: 'success', message: '예약이 수정되었습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
  return { mutate, isSuccess };
};

export const useGetMyReservations = () => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['myReservations'],
    queryFn: () => myReservation(),
  });
  return { data, refetch };
};
