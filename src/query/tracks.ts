import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
  getTracks, createTrack, deleteTrack, updateTrack,
} from 'api/tracks';
import { AxiosError } from 'axios';
import { TrackUpdate } from 'model/track';
import { useSnackBar } from 'ts/useSnackBar';

export const useGetTracks = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['tracks'],
    queryFn: () => getTracks(),
  });
  return { data };
};

export const useCreateTrack = () => {
  const queryClient = useQueryClient();
  const openSnackBar = useSnackBar();
  return useMutation({
    mutationFn: (track: TrackUpdate) => createTrack(track),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      openSnackBar({ type: 'success', message: '트랙 추가에 성공했습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
};

export const useUpdateTrack = () => {
  const queryClient = useQueryClient();
  const openSnackBar = useSnackBar();
  return useMutation({
    mutationFn: (params: { id: number, updatedTrack: TrackUpdate }) => updateTrack(params.id, params.updatedTrack),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      openSnackBar({ type: 'success', message: '트랙 수정에 성공했습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
};

export const useDeleteTrack = () => {
  const queryClient = useQueryClient();
  const openSnackBar = useSnackBar();
  return useMutation({
    mutationFn: (id: number) => deleteTrack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      openSnackBar({ type: 'success', message: '트랙 삭제에 성공했습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
};
