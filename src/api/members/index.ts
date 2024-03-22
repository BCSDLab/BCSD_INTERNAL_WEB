import { accessClient } from 'api';
import {
  AdminMemberUpdate, LoginResponse, Member, MemberCreate, MemberResponse, MemberUpdate,
  CertificationToken, RequestChangePassword, ChangePassword, MemberDelete,
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

export const getMember = (id: number) => accessClient.get<Member>(`/members/${id}`);

export const updateMember = (memberId: number, member: AdminMemberUpdate) => accessClient.put<Member>(`/admin/members/${memberId}`, member);

export const deleteMember = (member: MemberDelete) => accessClient.delete<Member>('/admin/members', { data: member });

export const createMember = (member: MemberCreate) => accessClient.post<Member>('/admin/members', member);

export const login = (studentNumber: string, password: string) => accessClient.post<LoginResponse>('/members/login', { studentNumber, password });

export const getNotAuthedMembers = () => accessClient.get<MemberResponse>('/members?authed=false&size=1000&page=0');

export const getMe = () => accessClient.get<Member>('/members/me');

export const updateMe = (member: MemberUpdate) => accessClient.put<Member>('/members', member);

// response body가 없는 api
export const requestChangePassword = (email: RequestChangePassword) => accessClient.post('/members/password/change', email);

export const certificationToken = (info: CertificationToken) => accessClient.post('/members/password/certification', info);

export const changePassword = (info: ChangePassword) => accessClient.post('/members/password', info);
