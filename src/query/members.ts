import { useSuspenseQuery } from '@tanstack/react-query';
import { getMembers } from 'api/members';

interface GetMember {
  pageIndex: number;
  pageSize: number;
  trackId: number | null;
}

export const useGetMembers = ({ pageIndex, pageSize, trackId }: GetMember) => {
  const { data } = useSuspenseQuery({
    queryKey: ['members', pageIndex, pageSize, trackId],
    queryFn: () => {
      if (trackId === null) return getMembers(pageIndex, pageSize);
      return getMembers(pageIndex, pageSize, trackId);
    },
  });
  return { data };
};
