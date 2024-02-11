import { useSuspenseQuery } from '@tanstack/react-query';
import { getMembers } from 'api/members';

export const useGetMembers = (pageIndex: number, pageSize: number, trackId: number | string) => {
  const { data } = useSuspenseQuery({
    queryKey: ['members', pageIndex, pageSize, trackId],
    queryFn: () => getMembers(pageIndex, pageSize, trackId),
  });
  return { data };
};
