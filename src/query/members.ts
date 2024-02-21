import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
  createMember,
  deleteMember, getMember, getMembers, getMembersNotDeleted, login, updateMember, getNotAuthedMembers, getMe, updateMe,
} from 'api/members';
import { AdminMemberUpdate, MemberCreate, MemberUpdate } from 'model/member';
import { AxiosError } from 'axios';
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

interface ErrorResponse {
  message: string;
}

export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  const openSnackBar = useSnackBar();
  return useMutation({
    mutationFn: (params: { id: number, updatedMember: AdminMemberUpdate }) => updateMember(params.id, params.updatedMember),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      openSnackBar({ type: 'success', message: '회원정보 수정에 성공했습니다.' });
    },
    onError: (e) => {
      const err = e as AxiosError;
      openSnackBar({ type: 'error', message: (err.response?.data as ErrorResponse).message });
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

export const useGetMe = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: () => getMe(),
  });

  return { data };
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (member: MemberUpdate) => updateMe(member),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
};
