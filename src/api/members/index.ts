import { accessClient } from 'api';
import { Member } from 'model/member';
import { Pagination } from 'model/page';

export const getMembers = (pageIndex: number, pageSize: number, trackId?: number) => {
  if (trackId === undefined) return accessClient.get <Pagination<Member>>(`/members?page=${pageIndex}&size=${pageSize}`);
  return accessClient.get<Pagination<Member>>(`/members?page=${pageIndex}&size=${pageSize}&trackId=${trackId}`);
};
