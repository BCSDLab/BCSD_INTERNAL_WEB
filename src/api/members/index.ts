import { accessClient } from 'api';

export const getMembers = async (pageIndex: number, pageSize: number, trackId: number | string) => {
  const { data } = await accessClient.get(`/members?page=${pageIndex}&size=${pageSize}&trackId=${trackId}`);
  return data;
};
