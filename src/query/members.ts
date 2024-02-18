import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
  createMember,
  deleteMember, getMember, getMembers, getMembersNotDeleted, login, updateMember,
} from 'api/members';
import { AdminMemberUpdate, MemberCreate } from 'model/member';

interface GetMember {
  pageIndex: number;
  pageSize: number;
  trackId: number | null;
  deleted?: boolean | null;
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

export const useGetMembersNotDeleted = ({
  pageIndex, pageSize, trackId, deleted,
}: GetMember) => {
  const { data } = useSuspenseQuery({
    queryKey: ['members', pageIndex, pageSize, trackId, deleted],
    queryFn: () => {
      if (trackId === null) return getMembersNotDeleted(pageIndex, pageSize, false);
      return getMembersNotDeleted(pageIndex, pageSize, false, trackId);
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

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (member: MemberCreate) => createMember(member),
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
