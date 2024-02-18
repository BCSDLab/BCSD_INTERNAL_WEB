export interface DuesInfo {
  year: number;
  dues: Dues[];
}

interface Dues {
  memberId: number;
  name: string;
  track: TrackInfo;
  unpaidCount: number;
  detail: DuesDetail[];
}

export interface DuesDetail {
  month: number;
  status: '납부' | '면제' | '미납' | null;
  memo?: string;
}

interface TrackInfo {
  id: number;
  name: string;
}
