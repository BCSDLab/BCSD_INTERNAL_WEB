export interface MemberShipDues {
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

interface DuesDetail {
  month: number;
  status: string;
  memo?: string;
}

interface TrackInfo {
  id: number;
  name: string;
}