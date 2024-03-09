export interface Job {
  id: number;
  memberId: number;
  type: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
}

export interface JobsResponse {
  year: number;
  jobs: Job[];
}
