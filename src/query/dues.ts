import { useSuspenseQuery } from '@tanstack/react-query';
import { DuesOptions, getAllDues } from 'api/Dues';
import { MembershipDues } from 'model/dues/allDues';

export const useGetAllDues = ({ year, track }: DuesOptions) => {
  const { data: allDues }: { data: MembershipDues } = useSuspenseQuery({
    queryKey: ['dues', year, track],
    queryFn: () => getAllDues({ year, track }),
  });
  return { allDues };
};
