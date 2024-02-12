import { accessClient } from 'api';
import { MemberShipDues } from 'model/dues/allDues';

export const getAllDues = async (year: number, track?: string) => {
  return await accessClient.get<MemberShipDues>(`/dues?year=${year}&track=${track}`);
};
