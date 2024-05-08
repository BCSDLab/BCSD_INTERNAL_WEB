import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptMember, slackSync } from 'api/admin';
import axios from 'axios';
import { SlackSyncResponse } from 'model/admin';
import { useSnackBar } from 'ts/useSnackBar';

export const useAcceptMember = () => {
  const openSnackBar = useSnackBar();
  const queryClinet = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (memberId: number) => acceptMember(memberId),
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ['notAuthed'] });
      openSnackBar({ type: 'success', message: '승인했습니다.' });
    },
    onError: (e) => {
      if (axios.isAxiosError(e) && e.response && 'message' in e.response.data) {
        openSnackBar({ type: 'error', message: e.response.data.message });
      }
    },
  });

  return { mutate };
};

export const useSlackSync = () => {
  const openSnackBar = useSnackBar();
  const { mutate } = useMutation<SlackSyncResponse>({
    mutationFn: () => slackSync(),
    onSuccess: () => {
      openSnackBar({ type: 'success', message: '슬랙 동기화 성공' });
    },
    onError: (e) => {
      if (axios.isAxiosError(e) && e.response && 'message' in e.response.data) {
        openSnackBar({ type: 'error', message: e.response.data.message });
      }
    },
  });
  return { mutate };
};
