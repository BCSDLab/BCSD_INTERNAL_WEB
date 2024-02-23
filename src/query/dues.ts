import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import {
  DuesOptions, NewDuesData, getAllDues, postDues, putDues,
} from 'api/Dues';
import { DuesInfo } from 'model/dues/allDues';
import { useSnackBar } from 'ts/useSnackBar';

export const useGetAllDues = ({ year, track }: DuesOptions) => {
  const { data, refetch } = useSuspenseQuery<DuesInfo>({
    queryKey: ['dues', year, track],
    queryFn: () => getAllDues({ year, track }),
  });
  return { data, refetch };
};

export const usePostDues = () => {
  const openSnackBar = useSnackBar();

  const postDuesMutation = useMutation({
    mutationKey: ['postDues'],
    mutationFn: (data: NewDuesData) => postDues(data),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => openSnackBar({ type: 'success', message: '회비 내역이 수정되었습니다.' }),
  });
  return postDuesMutation;
};

export const usePutDues = () => {
  const openSnackBar = useSnackBar();

  const putDuesMutation = useMutation({
    mutationKey: ['putDues'],
    mutationFn: (data: NewDuesData) => putDues(data),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => openSnackBar({ type: 'success', message: '회비 내역이 수정되었습니다.' }),
  });
  return putDuesMutation;
};
