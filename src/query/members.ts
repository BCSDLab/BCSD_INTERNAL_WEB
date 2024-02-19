import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
  deleteMember, getMember, getMembers, getMembersNotDeleted, updateMember,
  login, getNotAuthedMembers,
} from 'api/members';
import { AdminMemberUpdate } from 'model/member';
import { useNavigate } from 'react-router-dom';
import { useSnackBar } from 'ts/useSnackBar';

interface GetMembers {
  pageIndex: number;
  pageSize: number;
  trackId: number | null;
  deleted?: boolean | null;
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

export const useGetMembersNotDeleted = ({
  pageIndex, pageSize, trackId, deleted,
}: GetMembers) => {
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

export const useLogin = () => {
  const openSnackBar = useSnackBar();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ studentNumber, password }: LoginRequest) => login(studentNumber, password),
    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.accessToken);
      openSnackBar({ type: 'success', message: '로그인에 성공했습니다.' });
      navigate('/member');
    },
    onError: (e) => openSnackBar({ type: 'error', message: e.message }),
  });

  return { mutate, isPending };
};

export const useNotAuthedMember = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['notAuthed'],
    queryFn: () => getNotAuthedMembers(),
  });

  return { data };
};
