import { accessClient } from 'api';
import { Team, TeamUpdate } from 'model/team';

export const getTeams = () => accessClient.get<Team[]>('/teams?isDeleted=false');

export const updateTeam = (team: TeamUpdate) => accessClient.put<Team>('/teams', team);

export const createTeam = (team: string) => accessClient.post<Team>('/teams', { name: team });

export const deleteTeam = (teamId: number) => accessClient.delete<Team>(`/teams/${teamId}`);

export const getTeamsMembers = () => accessClient.get<Team[]>('/teams/members?page=0&size=1000');

export const createTeamMember = (memberId: number, isLeader: boolean, teamId: number) => accessClient.post<Team>('/teams/members', { memberId, isLeader, teamId });

export const getTeamMembers = (teamId: number) => accessClient.get<Team[]>(`/teams/members/${teamId}?page=0&size=1000`);

export const deleteTeamMember = (teamId: number, memberId: number) => accessClient.delete<Team>(`/teams/${teamId}/members/${memberId}`, { data: { memberId } });
