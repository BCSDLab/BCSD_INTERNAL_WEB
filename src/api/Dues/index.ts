import { accessClient } from 'api';
import { MembershipDues } from 'model/dues/allDues';

export interface DuesOptions {
  year: number;
  track?: string;
}

export const getAllDues = ({ year, track }: DuesOptions) => accessClient.get<MembershipDues>(`/dues?year=${year}&track=${track}`);
