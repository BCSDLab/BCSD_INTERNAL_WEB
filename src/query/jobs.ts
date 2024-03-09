import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Job, JobsResponse } from 'model/job';
import { deleteJobs, getJobs, putJobs } from 'api/jobs';
import { useSnackBar } from 'ts/useSnackBar';

export const useGetJobs = (year: number, trackId?: number) => {
  const { data, refetch } = useSuspenseQuery<JobsResponse>({
    queryKey: ['jobs', year, trackId],
    queryFn: () => getJobs({ year, trackId }),
  });
  return { data, refetch };
};

export const usePutJobs = () => {
  const openSnackBar = useSnackBar();

  const putJobsMutation = useMutation({
    mutationKey: ['putJobs'],
    mutationFn: (data: Job) => putJobs(data),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => openSnackBar({ type: 'success', message: '직책이 수정되었습니다.' }),
  });
  return putJobsMutation;
};

export const usePostJobs = () => {
  const openSnackBar = useSnackBar();

  const postJobsMutation = useMutation({
    mutationKey: ['postJobs'],
    mutationFn: (data: Job) => putJobs(data),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => openSnackBar({ type: 'success', message: '직책이 추가되었습니다.' }),
  });
  return postJobsMutation;
};

export const useDeleteJobs = () => {
  const openSnackBar = useSnackBar();

  const deleteJobsMutation = useMutation({
    mutationKey: ['deleteJobs'],
    mutationFn: (jobId: number) => deleteJobs(jobId),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => openSnackBar({ type: 'success', message: '직책이 삭제되었습니다.' }),
  });
  return deleteJobsMutation;
};
