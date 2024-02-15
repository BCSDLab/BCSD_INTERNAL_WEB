import { Track } from './track';

export type StatusType = 'ATTEND' | 'OFF' | 'IPP' | 'ARMY' | 'COMPLETION' | 'GRADUATE';
export type MemberType = 'BEGINNER' | 'REGULAR' | 'MENTOR';

const STATUS_LABEL = {
  ATTEND: '재학',
  OFF: '휴학',
  IPP: '현장실습',
  ARMY: '군 휴학',
  COMPLETION: '수료',
  GRADUATE: '졸업',
} as const;

enum Authority {
  NORMAL = 'NORMAL',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

export interface Member {
  id: number;
  joinedYear: number;
  joinedMonth: number;
  track: Track;
  memberType: MemberType;
  status: StatusType;
  name: string;
  company: string;
  department: string;
  studentNumber: string;
  phoneNumber: string;
  email: string;
  authority: Authority;
  githubName: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isAuthed: boolean;
  isDeleted: boolean;
}

export interface AdminMemberUpdate {
  year: number;
  month: number;
  trackId: number;
  memberType: MemberType;
  status: StatusType;
  name: string;
  company: string;
  department: string;
  studentNumber: string;
  phoneNumber: string;
  email: string;
  githubName: string;
  profileImageUrl: string;
  isAuthed: boolean;
  isDeleted: boolean;
}

const REVERSE_STATUS_LABEL = Object.entries(STATUS_LABEL).reduce((acc, [key, value]) => {
  acc[value] = key as StatusType;
  return acc;
}, {} as Record<string, StatusType>);

const geReverseStatus = (label: string): StatusType => {
  return REVERSE_STATUS_LABEL[label] as StatusType;
};

export const toAdminMemberUpdate = (member: Member): AdminMemberUpdate => {
  const reverseStatus = geReverseStatus(member.status);

  return {
    name: member.name,
    trackId: member.track.id,
    memberType: member.memberType,
    status: reverseStatus,
    company: member.company,
    department: member.department,
    studentNumber: member.studentNumber,
    phoneNumber: member.phoneNumber,
    email: member.email,
    githubName: member.githubName,
    profileImageUrl: member.profileImageUrl,
    year: member.joinedYear,
    month: member.joinedMonth,
    isAuthed: member.isAuthed,
    isDeleted: member.isDeleted,
  };
};
