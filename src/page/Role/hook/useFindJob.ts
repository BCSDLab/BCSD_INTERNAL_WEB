import { useGetJobs } from 'query/jobs';
import { useGetMembers } from 'query/members';

interface UseFindJobProps {
  year: number;
}

export default function useFindJob({ year }: UseFindJobProps) {
  const { data, refetch } = useGetJobs(year);
  const { data: members } = useGetMembers({ pageIndex: 0, pageSize: 1000, trackId: null });
  const chairMen = data.jobs.filter((job) => job.type === '회장');
  const viceChairMen = data.jobs.filter((job) => job.type === '부회장');
  const trackLeaders = data.jobs.filter((job) => job.type === '트랙장');
  const educationLeaders = data.jobs.filter((job) => job.type === '교육장');
  const etc = data.jobs.filter((job) => job.type !== '회장' && job.type !== '부회장' && job.type !== '트랙장' && job.type !== '교육장');
  const chairMenInfo = chairMen.map((chairMan) => members?.content.find((member) => member.id === chairMan.memberId));
  const viceChairMenInfo = viceChairMen.map((viceChairMan) => members?.content.find((member) => member.id === viceChairMan.memberId));
  const trackLeadersInfo = trackLeaders.map((trackLeader) => members?.content.find((member) => member.id === trackLeader.memberId));
  const educationLeadersInfo = educationLeaders.map((educationLeader) => members?.content.find((member) => member.id === educationLeader.memberId));
  const etcInfo = etc.map((etcMember) => members?.content.find((member) => member.id === etcMember.memberId));
  return {
    chairMen, viceChairMen, trackLeaders, educationLeaders, etc, chairMenInfo, viceChairMenInfo, trackLeadersInfo, educationLeadersInfo, etcInfo, refetch,
  };
}
