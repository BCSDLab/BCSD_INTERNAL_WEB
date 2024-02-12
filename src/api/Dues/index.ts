import { accessClient } from 'api';
import { DuesInfo } from 'model/dues/allDues';

export interface DuesOptions {
  year: number;
  track?: string;
}

export const getAllDues = ({ year, track }: DuesOptions) => accessClient.get<DuesInfo>(`/dues?year=${year}&track=${track}`);
