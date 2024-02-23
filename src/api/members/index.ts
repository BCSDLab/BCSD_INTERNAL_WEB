import { accessClient } from 'api';
import {
  AdminMemberUpdate, LoginResponse, Member, MemberCreate, MemberResponse, MemberUpdate,
} from 'model/member';
import { Pagination } from 'model/page';

export const getMembers = (pageIndex: number, pageSize: number, trackId?: number) => {
  if (trackId === undefined) return accessClient.get <Pagination<Member>>(`/members?page=${pageIndex}&size=${pageSize}&deleted=false`);
  return accessClient.get<Pagination<Member>>(`/members?page=${pageIndex}&size=${pageSize}&trackId=${trackId}&deleted=false`);
};

export const getMembersDeleted = (pageIndex: number, pageSize: number, trackId?: number) => {
  if (trackId === undefined) return accessClient.get<Pagination<Member>>(`/members?page=${pageIndex}&size=${pageSize}&deleted=true`);
  return accessClient.get<Pagination<Member>>(`/members?page=${pageIndex}&size=${pageSize}&trackId=${trackId}&deleted=true`);
};

export const getMember = (id: number) => {
  return accessClient.get<Member>(`/members/${id}`);
};

export const updateMember = (memberId: number, member: AdminMemberUpdate) => {
  return accessClient.put<Member>(`/admin/members/${memberId}`, member);
};

export const deleteMember = (memberId: number) => {
  return accessClient.delete<Member>(`/admin/members/${memberId}`);
};

export const createMember = (member: MemberCreate) => {
  return accessClient.post<Member>('/admin/members', member);
};

export const login = (studentNumber: string, password: string) => accessClient.post<LoginResponse>('/members/login', { studentNumber, password });

export const getNotAuthedMembers = () => accessClient.get<MemberResponse>('/members?authed=false');

export const getMe = () => accessClient.get<Member>('/members/me');

export const updateMe = (member: MemberUpdate) => accessClient.put<Member>('/members', member);
