// eslint-disable-next-line import/no-cycle
import { Track } from './track';

export type StatusType = 'ATTEND' | 'OFF' | 'IPP' | 'ARMY' | 'COMPLETION' | 'GRADUATE';
export type StatusLabel = '재학' | '휴학' | '현장실습' | '군 휴학' | '수료' | '졸업';
export type Status = StatusType | StatusLabel;
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
  [x: string]: any;
  id: number;
  joinedYear: number;
  joinedMonth: number;
  track: Track;
  memberType: MemberType;
  status: Status;
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
  isFeeExempt: boolean;
  deleteReason: string;
  birthday: string;
}

export interface AdminMemberUpdate {
  joinedYear: number;
  joinedMonth: number;
  trackId: number;
  memberType: MemberType;
  status: Status;
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
  authority: Authority;
  deleteReason: string;
  birthday: string;
}

export interface MemberUpdate {
  joinedYear: number;
  joinedMonth: number;
  trackId: number;
  memberType: MemberType;
  status: Status;
  name: string;
  company: string;
  department: string;
  studentNumber: string;
  phoneNumber: string;
  email: string;
  githubName: string;
  profileImageUrl: string;
  birthday: string;
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
  authority?: Authority;
  birthday?: string;
}

export interface MemberDelete {
  id: number;
  reason: string;
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
    authority: member.authority,
    deleteReason: member.deleteReason,
    birthday: member.birthday,
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
    authority: Authority.NORMAL,
    birthday: member.birthday,
  };
};

export type LoginResponse = {
  accessToken: string
};

export interface MemberResponse {
  content: Member[];
}

export interface RequestChangePassword {
  email: string;
}

export interface CertificationToken extends RequestChangePassword {
  token: string;
}

export interface ChangePassword extends CertificationToken {
  password: string;
}

export interface ChangePasswordForm extends ChangePassword {
  passwordCheck: string;
}
