import { accessClient } from 'api';
import { Job, JobsResponse, PostJob } from 'model/job';

interface JobsProps {
  year: number;
  trackId?: number;
}

export const getJobs = ({ year, trackId }: JobsProps) => {
  if (trackId === undefined) return accessClient.get<JobsResponse>(`/jobs?year=${year}`);
  return accessClient.get<JobsResponse>(`/jobs?year=${year}&trackId=${trackId}`);
};

export const putJobs = ({
  id, memberId, type, startYear, startMonth, endYear, endMonth,
}: Job) => {
  return accessClient.put<Job>(`/jobs?id=${id}&memberId=${memberId}&type=${type}&startYear=${startYear}&startMonth=${startMonth}&endYear=${endYear}&endMonth=${endMonth}`);
};

export const postJobs = ({
  email, type, startYear, startMonth, endYear, endMonth,
}: PostJob) => {
  return accessClient.post<PostJob>(`/jobs?email=${email}&type=${type}&startYear=${startYear}&startMonth=${startMonth}&endYear=${endYear}&endMonth=${endMonth}`);
};

export const deleteJobs = (jobId: number) => {
  return accessClient.delete(`/jobs?id=${jobId}`);
};
