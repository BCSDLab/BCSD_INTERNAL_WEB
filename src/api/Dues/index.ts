import { accessClient } from 'api';
import { DuesInfo } from 'model/dues/allDues';

export interface DuesOptions {
  year: number;
  track?: string;
}

export const getAllDues = ({ year, track }: DuesOptions) => {
  const query = track ? `/dues?year=${year}&track=${track}` : `/dues?year=${year}`;
  return accessClient.get<DuesInfo>(query);
};
