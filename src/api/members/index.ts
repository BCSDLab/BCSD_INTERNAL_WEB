import { accessClient } from 'api';
import { AdminMemberUpdate, Member, LoginResponse } from 'model/member';
import { Pagination } from 'model/page';

export const getMembers = (pageIndex: number, pageSize: number, trackId?: number) => {
  if (trackId === undefined) return accessClient.get <Pagination<Member>>(`/members?page=${pageIndex}&size=${pageSize}`);
  return accessClient.get<Pagination<Member>>(`/members?page=${pageIndex}&size=${pageSize}&trackId=${trackId}`);
};

export const getMember = (id: number) => {
  return accessClient.get<Member>(`/members/${id}`);
};

export const updateMember = (memberId: number, member: AdminMemberUpdate) => {
  return accessClient.put<Member>(`/admin/members/${memberId}`, member);
};

export const login = (studentNumber: string, password: string) => accessClient.post<LoginResponse>('/members/login', { studentNumber, password });
