export interface PostJob {
  memberId?: number;
  email?: string;
  type: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
}

export interface Job extends PostJob {
  id: number;
}

export interface JobsResponse {
  year: number;
  jobs: Job[];
}
