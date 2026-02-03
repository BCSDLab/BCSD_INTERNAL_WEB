import { accessClient } from 'api';

// response가 없음
export const acceptMember = (memberId: number) => accessClient.patch(`/admin/members/${memberId}/accept`);

export const slackSync = () => accessClient.post('/admin/members/slack-sync');

export const updateMemberActive = (memberId: number, isActive: boolean) => accessClient.patch(`/admin/members/${memberId}/active`, { isActive });
