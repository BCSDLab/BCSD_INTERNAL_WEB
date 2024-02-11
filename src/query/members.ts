import { useSuspenseQuery } from '@tanstack/react-query';
import { getMembers } from 'api/members';

export const useGetMembers = (pageIndex: number, pageSize: number, trackId: number | null) => {
  const { data } = useSuspenseQuery({
    queryKey: ['members', pageIndex, pageSize, trackId],
    queryFn: () => {
      if (trackId === null) return getMembers(pageIndex, pageSize);
      return getMembers(pageIndex, pageSize, trackId);
    },
  });
  return { data };
};
