import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
  createTeam, createTeamMember, deleteTeam, deleteTeamMember, getTeamMembers, getTeams, getTeamsMembers, updateTeam,
} from 'api/teams';
import { AxiosError } from 'axios';
import { TeamUpdate } from 'model/team';
import { useSnackBar } from 'ts/useSnackBar';

export const useGetTeams = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['teams'],
    queryFn: () => getTeams(),
  });
  return { data };
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  const openSnackBar = useSnackBar();
  return useMutation({
    mutationFn: (team: string) => createTeam(team),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      openSnackBar({ type: 'success', message: '팀 추가에 성공했습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
};

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();
  const openSnackBar = useSnackBar();
  return useMutation({
    mutationFn: (team: TeamUpdate) => updateTeam(team),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      openSnackBar({ type: 'success', message: '팀 수정에 성공했습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();
  const openSnackBar = useSnackBar();
  return useMutation({
    mutationFn: (id: number) => deleteTeam(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      openSnackBar({ type: 'success', message: '팀 삭제에 성공했습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
};

export const useGetTeamsMembers = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['teams/members'],
    queryFn: () => getTeamsMembers(),
  });
  return { data };
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  const openSnackBar = useSnackBar();
  return useMutation({
    mutationFn: (params: { memberId: number, isLeader: boolean, teamId: number }) => createTeamMember(params.memberId, params.isLeader, params.teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams/members'] });
      openSnackBar({ type: 'success', message: '팀원 추가에 성공했습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
};

export const useGetTeamMembers = (teamId: number) => {
  const { data } = useSuspenseQuery({
    queryKey: ['teams/members', teamId],
    queryFn: () => getTeamMembers(teamId),
  });
  return { data };
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  const openSnackBar = useSnackBar();
  return useMutation({
    mutationFn: (params: { teamId: number, memberId: number }) => deleteTeamMember(params.teamId, params.memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams/members'] });
      openSnackBar({ type: 'success', message: '팀원 삭제에 성공했습니다.' });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        openSnackBar({ type: 'error', message: e.response?.data.message });
      }
    },
  });
};
