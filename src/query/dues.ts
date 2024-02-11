import { useSuspenseQuery } from "@tanstack/react-query"
import { getAllDues } from "api/Dues"

export const useDues = (year: number, track?: string) => {
  const { data: dues } = useSuspenseQuery({
    queryKey: ["dues", year],
    queryFn: () => getAllDues(year, track),
  });
  return { dues };
}