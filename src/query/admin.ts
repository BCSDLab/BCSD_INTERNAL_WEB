import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptMember } from 'api/admin';
import axios from 'axios';
import { useSnackBar } from 'ts/useSnackBar';

export const useAcceptMember = () => {
  const openSnackBar = useSnackBar();
  const queryClinet = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (memberId : number) => acceptMember(memberId),
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
