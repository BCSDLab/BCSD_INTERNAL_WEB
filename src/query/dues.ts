import { useSuspenseQuery } from "@tanstack/react-query"
import { getAllDues } from "api/Dues"

export const useGetAllDues = (year: number, track?: string) => {
  const { data: allDues } = useSuspenseQuery({
    queryKey: ["dues", year, track],
    queryFn: () => getAllDues(year, track),
  });
  return { allDues };
}