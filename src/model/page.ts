import { Member } from './member';

export interface MemberList {
  content: Member[];
  hasNext: boolean;
  currentPage: number;
  totalElements: number;
  totalPage: number;
  pageSize: number;
}
