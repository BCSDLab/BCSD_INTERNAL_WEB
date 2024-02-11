import { accessClient } from 'api';

export const getMembers = async (pageIndex: number, pageSize: number, track: string) => {
  const { data } = await accessClient.get(`/members?page=${pageIndex}&size=${pageSize}&track=${track}`);
  return data;
};
