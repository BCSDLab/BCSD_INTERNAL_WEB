import { Track } from './track';

export interface Member {
  id: number;
  joinedYear: number;
  joinedMonth: number;
  track: Track;
  memberType: 'BEGINNER' | 'REGULAR' | 'MENTOR';
  status: string;
  name: string;
  company: string;
  department: string;
  studentNumber: string;
  phoneNumber: string;
  email: string;
  authority: 'NORMAL' | 'MANAGER' | 'ADMIN';
  githubName: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isAuthed: boolean;
  isDeleted: boolean;
}

export type LoginResponse = {
  accessToken: string
};
