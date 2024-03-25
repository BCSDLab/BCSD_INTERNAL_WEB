import { Member } from './member';

export interface Team {
  teamId?: number;
  id: number;
  name: string;
  leaders: Member;
  isLeader?: boolean;
  memberResponse?: Member;
}

export interface TeamMember {
  id: number;
  teamId: number;
  teamName: string;
  isLeader: boolean;
  memberResponse: Member;
}

export interface TeamUpdate {
  id: number;
  name: string;
  isDeleted: boolean;
}
