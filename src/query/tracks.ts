import { useSuspenseQuery } from '@tanstack/react-query';
import { getTracks } from 'api/tracks';

export const useGetTracks = () => {
  const { data } = useSuspenseQuery({
    queryKey: [],
    queryFn: () => getTracks(),
  });
  return { data };
};
