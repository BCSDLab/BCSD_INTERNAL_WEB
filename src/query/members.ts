import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { getMembers, login } from 'api/members';

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
  const { data, mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ studentNumber, password }: LoginRequest) => login(studentNumber, password),
  });

  if (data) localStorage.setItem('accessToken', data.accessToken);

  return { mutate };
};
