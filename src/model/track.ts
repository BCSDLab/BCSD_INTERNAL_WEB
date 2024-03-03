// eslint-disable-next-line import/no-cycle
import { Member } from './member';

export interface Track {
  id: number;
  name: string;
  leader: Member;
}

export interface TrackUpdate {
  name: string;
}
