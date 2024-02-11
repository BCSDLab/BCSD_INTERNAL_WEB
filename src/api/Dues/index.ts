import { accessClient } from 'api';
import { MemberShipDues } from 'model/dues/allDues';

export const getAllDues = async (year: number, track?: string) => {
  const response = await accessClient.get<MemberShipDues>(`/dues?year=${year}&track=${track}`);
  return response;
};
