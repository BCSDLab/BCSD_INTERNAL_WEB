import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
  getMember, getMembers, login, updateMember,
} from 'api/members';
import { AdminMemberUpdate } from 'model/member';

interface GetMembers {
  pageIndex: number;
  pageSize: number;
  trackId: number | null;
}

interface LoginRequest {
  studentNumber: string,
  password: string,
}

export const useGetMembers = ({ pageIndex, pageSize, trackId }: GetMembers) => {
  const { data } = useSuspenseQuery({
    queryKey: ['members', pageIndex, pageSize, trackId],
    queryFn: () => {
      if (trackId === null) return getMembers(pageIndex, pageSize);
      return getMembers(pageIndex, pageSize, trackId);
    },
  });
  return { data };
};

export const useGetMember = (id: number) => {
  const { data } = useSuspenseQuery({
    queryKey: ['member', id],
    queryFn: () => getMember(id),
  });
  return { data };
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { id: number, updatedMember: AdminMemberUpdate }) => updateMember(params.id, params.updatedMember),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
};

export const useLogin = () => {
  const { data, mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ studentNumber, password }: LoginRequest) => login(studentNumber, password),
  });

  if (data) localStorage.setItem('accessToken', data.accessToken);

  return { mutate };
};
