import { Member } from './member';

export interface Team {
  id: number;
  name: string;
  memberResponse?: Member;
}
