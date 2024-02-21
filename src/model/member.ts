import { Track } from './track';

export type StatusType = 'ATTEND' | 'OFF' | 'IPP' | 'ARMY' | 'COMPLETION' | 'GRADUATE';
export type MemberType = 'BEGINNER' | 'REGULAR' | 'MENTOR';

export const STATUS_LABEL = {
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
  joinedYear: number;
  joinedMonth: number;
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

export interface MemberUpdate {
  joinedYear: number;
  joinedMonth: number;
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
}

export interface MemberCreate {
  joinedYear?: number;
  joinedMonth?: number;
  trackId?: number;
  memberType?: MemberType;
  status?: StatusType;
  name?: string;
  password?: string;
  company?: string;
  department?: string;
  studentNumber?: string;
  phoneNumber?: string;
  email?: string;
  githubName?: string;
  profileImageUrl?: string;
  isAuthed?: boolean;
  isDeleted?: boolean;
}

const REVERSE_STATUS_LABEL = Object.entries(STATUS_LABEL).reduce((acc, [key, value]) => {
  acc[value] = key as StatusType;
  return acc;
}, {} as Record<string, StatusType>);

const getReverseStatus = (label: string): StatusType => {
  return REVERSE_STATUS_LABEL[label] as StatusType;
};

export const toAdminMemberUpdate = (member: Member): AdminMemberUpdate => {
  const reverseStatus = getReverseStatus(member.status);

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
    joinedYear: member.joinedYear,
    joinedMonth: member.joinedMonth,
    isAuthed: member.isAuthed,
    isDeleted: member.isDeleted,
  };
};

export const toMemberCreate = (member: MemberCreate): MemberCreate => {
  const reverseStatus = member.status ? getReverseStatus(member.status) : undefined;

  return {
    name: member.name,
    trackId: member.trackId,
    memberType: member.memberType,
    status: reverseStatus,
    company: member.company,
    department: member.department,
    studentNumber: member.studentNumber,
    phoneNumber: member.phoneNumber,
    email: member.email,
    githubName: member.githubName,
    profileImageUrl: member.profileImageUrl,
    joinedYear: member.joinedYear,
    joinedMonth: member.joinedMonth,
    password: member.password,
    isAuthed: true,
    isDeleted: false,
  };
};

export type LoginResponse = {
  accessToken: string
};

export interface MemberResponse {
  content: Member[];
}
