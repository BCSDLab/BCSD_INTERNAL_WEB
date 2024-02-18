/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useQueryParam(key: string, type: string): string | number | null {
  const location = useLocation();
  const [param, setParam] = useState<string | number | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get(key);
    if (paramValue) {
      if (type === 'number') {
        setParam(parseInt(paramValue, 10));
      } else {
        setParam(paramValue);
      }
    } else {
      setParam(null);
    }
  }, [location.search, key, type]);

  return param;
}
