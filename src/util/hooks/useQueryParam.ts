/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom';

export default function useQueryParam(name: string) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const value = searchParams.get(name) as string | undefined;

  return value;
}
