import { accessClient } from 'api';
import { DuesInfo } from 'model/dues/allDues';

export interface DuesOptions {
  year: number;
  track?: string;
}

export interface PutDuesQuery {
  memberId: number;
  year: number;
  month: number;
}

export interface PutDuesData {
  status: 'PAID' | 'SKIP' | 'NOT_PAID' | null;
  memo?: string | null;
}

export interface DeleteDuesProps {
  year: number;
  month: number;
  memberId: number;
}
export interface NewDuesData extends DeleteDuesProps {
  status: 'PAID' | 'SKIP' | 'NOT_PAID' | null;
  memo?: string | null;
}

export const getAllDues = ({ year, track }: DuesOptions) => {
  const query = track ? `/dues?year=${year}&track=${track}` : `/dues?year=${year}`;
  return accessClient.get<DuesInfo>(query);
};

export const postDues = (data: NewDuesData) => {
  return accessClient.post('/dues', data);
};

export const putDues = (data: NewDuesData) => {
  return accessClient.put(`/dues?year=${data.year}&month=${data.month}&memberId=${data.memberId}`, { status: data.status, memo: data.memo });
};

export const deleteDues = ({ year, month, memberId }: DeleteDuesProps) => {
  return accessClient.delete(`/dues?year=${year}&month=${month}&memberId=${memberId}`);
};
