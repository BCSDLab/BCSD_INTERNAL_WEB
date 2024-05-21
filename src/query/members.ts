import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
  createMember,
  deleteMember, getMember, getMembers, getMembersDeleted, login, updateMember, getNotAuthedMembers, getMe, updateMe, getSearchMembers,
} from 'api/members';
import {
  AdminMemberUpdate, MemberCreate, MemberDelete, MemberUpdate,
} from 'model/member';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackBar } from 'ts/useSnackBar';
import { useLoginState } from 'store/loginStore';
import { PATHS } from 'util/constants/path';

interface GetMembers {
  pageIndex: number;
  pageSize: number;
  trackId: number | null;
  deleted?: boolean | null;
}

interface SearchMembers {
  pageIndex: number;
  pageSize: number;
  name: string;
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

export const useSearchMembers = ({ pageIndex, pageSize, name }: SearchMembers) => {
  const { data } = useQuery({
    queryKey: ['members', pageIndex, pageSize, name],
    queryFn: () => getSearchMembers(pageIndex, pageSize, name),
  });
  return { data };
};

export const useGetMembersDeleted = ({
  pageIndex, pageSize, trackId,
}: GetMembers) => {
  const { data } = useSuspenseQuery({
    queryKey: ['members', 'membersDeleted', pageIndex, pageSize, trackId],
    queryFn: () => {
      if (trackId === null) return getMembersDeleted(pageIndex, pageSize);
      return getMembersDeleted(pageIndex, pageSize, trackId);
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
  const openSnackBar = useSnackBar();
  return useMutation({
    mutationFn: (params: { id: number, updatedMember: AdminMemberUpdate }) => updateMember(params.id, params.updatedMember),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      openSnackBar({ type: 'success', message: '회원정보 수정에 성공했습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const openSnackBar = useSnackBar();
  return useMutation({
    mutationFn: (member: MemberDelete) => deleteMember(member.id, member.reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      openSnackBar({ type: 'success', message: '회원 삭제에 성공했습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  const openSnackBar = useSnackBar();
  return useMutation({
    mutationFn: (member: MemberCreate) => createMember(member),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      openSnackBar({ type: 'success', message: '회원 추가에 성공했습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
};

export const useLogin = () => {
  const openSnackBar = useSnackBar();
  const navigate = useNavigate();
  const { setMe } = useLoginState();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ studentNumber, password }: LoginRequest) => login(studentNumber, password),
    onSuccess: async (response) => {
      localStorage.setItem('accessToken', response.accessToken);
      setMe();
      const me = await getMe();
      openSnackBar({ type: 'success', message: '로그인에 성공했습니다.' });
      if (me.memberType === 'BEGINNER') navigate(PATHS.track);
      else navigate(PATHS.member);
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
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
  const openSnackBar = useSnackBar();
  return useMutation({
    mutationFn: (member: MemberUpdate) => updateMe(member),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      openSnackBar({ type: 'success', message: '회원정보 수정에 성공했습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
};
