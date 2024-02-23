export interface DuesInfo {
  year: number;
  dues: Dues[];
}

export interface Dues {
  memberId: number;
  name: string;
  track: TrackInfo;
  unpaidCount: number;
  detail: DuesDetail[];
}

export type DuesStatus = 'PAID' | 'SKIP' | 'NOT_PAID' | null;

export interface DuesDetail {
  month: number;
  status: 'PAID' | 'SKIP' | 'NOT_PAID' | null;
  memo?: string | null;
}

interface TrackInfo {
  id: number;
  name: string;
}
