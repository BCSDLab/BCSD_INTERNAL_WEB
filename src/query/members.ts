import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { getMembers, getNotAuthedMembers, login } from 'api/members';
import { useNavigate } from 'react-router-dom';
import { useSnackBar } from 'ts/useSnackBar';

interface GetMember {
  pageIndex: number;
  pageSize: number;
  trackId: number | null;
}

interface LoginRequest {
  studentNumber: string,
  password: string,
}

export const useGetMembers = ({ pageIndex, pageSize, trackId }: GetMember) => {
  const { data } = useSuspenseQuery({
    queryKey: ['members', pageIndex, pageSize, trackId],
    queryFn: () => {
      if (trackId === null) return getMembers(pageIndex, pageSize);
      return getMembers(pageIndex, pageSize, trackId);
    },
  });
  return { data };
};

export const useLogin = () => {
  const openSnackBar = useSnackBar();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: ({ studentNumber, password }: LoginRequest) => login(studentNumber, password),
    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.accessToken);
      openSnackBar({ type: 'success', message: '로그인에 성공했습니다.' });
      navigate('/member');
    },
    onError: (e) => openSnackBar({ type: 'error', message: e.message }),
  });

  return { mutate };
};

export const useNotAuthedMember = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['notAuthed'],
    queryFn: () => getNotAuthedMembers(),
  });

  return { data };
};
