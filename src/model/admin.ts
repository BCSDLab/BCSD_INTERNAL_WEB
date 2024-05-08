export type AcceptMemberRequest = { memberId: number };

export interface SlackSyncResponse {
  imageSyncMemberCount: number;
  slackSyncMemberCount: number;
}
