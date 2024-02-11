import { accessClient } from 'api';
import { MemberList } from 'model/member';

export const getMembers = (pageIndex: number, pageSize: number, trackId?: number) => {
  if (trackId === undefined) return accessClient.get<MemberList>(`/members?page=${pageIndex}&size=${pageSize}`);
  return accessClient.get<MemberList>(`/members?page=${pageIndex}&size=${pageSize}&trackId=${trackId}`);
};
