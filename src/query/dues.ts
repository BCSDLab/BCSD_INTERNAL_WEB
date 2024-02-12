import { useSuspenseQuery } from '@tanstack/react-query';
import { getAllDues } from 'api/Dues';
import { MemberShipDues } from 'model/dues/allDues';

export const useGetAllDues = (year: number, track?: string) => {
  const { data: allDues }: { data: MemberShipDues } = useSuspenseQuery({
    queryKey: ['dues', year, track],
    queryFn: () => getAllDues(year, track),
  });
  return { allDues };
};
