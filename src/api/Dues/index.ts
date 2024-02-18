import { accessClient } from 'api';
import { DuesInfo } from 'model/dues/allDues';

export interface DuesOptions {
  year: number;
  track?: string;
}

export interface NewDuesProps {
  memberId: number;
  year: number;
  month: number;
  status: 'PAID' | 'SKIP' | 'NOT_PAID' | null;
  memo?: string | null;
}

export const getAllDues = ({ year, track }: DuesOptions) => {
  const query = track ? `/dues?year=${year}&track=${track}` : `/dues?year=${year}`;
  return accessClient.get<DuesInfo>(query);
};

export const postDues = (data: NewDuesProps) => {
  return accessClient.post('/dues', data);
};
