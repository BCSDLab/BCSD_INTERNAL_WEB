import { QueryClient, useMutation, useSuspenseQuery } from '@tanstack/react-query';
import {
  DeleteDuesProps,
  DuesOptions, NewDuesData, deleteDues, getAllDues, postDues, postDuesSheetSync, postSendDues, postSendDuesByDM, putDues,
} from 'api/dues';
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
  const queryClient = new QueryClient();

  const postDuesMutation = useMutation({
    mutationKey: ['postDues'],
    mutationFn: (data: NewDuesData) => postDues(data),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dues'],
      });
      openSnackBar({ type: 'success', message: '회비 내역이 수정되었습니다.' });
    },
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

export const useDeleteDues = () => {
  const openSnackBar = useSnackBar();

  const deleteDuesMutation = useMutation({
    mutationKey: ['deleteDues'],
    mutationFn: (data: DeleteDuesProps) => deleteDues(data),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => openSnackBar({ type: 'success', message: '회비 내역이 수정되었습니다.' }),
  });
  return deleteDuesMutation;
};

export const usePostSendDues = () => {
  const openSnackBar = useSnackBar();

  const postSendDuesMutation = useMutation({
    mutationKey: ['postSendDues'],
    mutationFn: (data: { year: number; month: number; explanation: string }) => postSendDues(data),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => openSnackBar({ type: 'success', message: '회비 공지를 완료했습니다.' }),
  });
  return postSendDuesMutation;
};

export const usePostSendDuesByDM = () => {
  const openSnackBar = useSnackBar();

  const postSendDuesByDMMutation = useMutation({
    mutationKey: ['postSendDuesByDM'],
    mutationFn: () => postSendDuesByDM(),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => openSnackBar({ type: 'success', message: '회비 내역 메시지를 전송했습니다.' }),
  });
  return postSendDuesByDMMutation;
};

export const usePostDuesSheetSync = () => {
  const openSnackBar = useSnackBar();
  const queryClient = new QueryClient();

  return useMutation({
    mutationKey: ['postDuesSheetSync'],
    mutationFn: () => postDuesSheetSync(),
    onError: (error) => openSnackBar({ type: 'error', message: error.message }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dues'],
      });
      openSnackBar({ type: 'success', message: '회비 시트 동기화를 완료했습니다.' });
    },
  });
};
