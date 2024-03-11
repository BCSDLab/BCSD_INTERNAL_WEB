import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Job, JobsResponse, PostJob } from 'model/job';
import {
  deleteJobs, getJobs, postJobs, putJobs,
} from 'api/jobs';
import { useSnackBar } from 'ts/useSnackBar';

interface MutationProps {
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

export const useGetJobs = (year: number, trackId?: number) => {
  const { data, refetch } = useSuspenseQuery<JobsResponse>({
    queryKey: ['jobs', year, trackId],
    queryFn: () => getJobs({ year, trackId }),
  });
  return { data, refetch };
};

export const usePutJobs = ({ setIsSuccess, onClose }: MutationProps) => {
  const openSnackBar = useSnackBar();

  const putJobsMutation = useMutation({
    mutationKey: ['putJobs'],
    mutationFn: (data: Job) => putJobs(data),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => {
      openSnackBar({ type: 'success', message: '직책이 수정되었습니다.' });
      setIsSuccess(true);
      onClose();
    },
  });
  return putJobsMutation;
};

export const usePostJobs = ({ setIsSuccess, onClose }: MutationProps) => {
  const openSnackBar = useSnackBar();

  const postJobsMutation = useMutation({
    mutationKey: ['postJobs'],
    mutationFn: (data: PostJob) => postJobs(data),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => {
      openSnackBar({ type: 'success', message: '직책이 추가되었습니다.' });
      setIsSuccess(true);
      onClose();
    },
  });
  return postJobsMutation;
};

export const useDeleteJobs = ({ setIsSuccess, onClose }: MutationProps) => {
  const openSnackBar = useSnackBar();

  const deleteJobsMutation = useMutation({
    mutationKey: ['deleteJobs'],
    mutationFn: (jobId: number) => deleteJobs(jobId),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => {
      openSnackBar({ type: 'success', message: '직책이 삭제되었습니다.' });
      setIsSuccess(true);
      onClose();
    },
  });
  return deleteJobsMutation;
};
