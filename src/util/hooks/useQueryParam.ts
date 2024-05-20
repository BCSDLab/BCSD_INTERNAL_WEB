/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom';

interface Options<T> {
  parser?: (val: string) => T;
  required?: boolean;
}

export function useQueryParam<T = string>(name: string): T | undefined;
export function useQueryParam<T = string>(name: string, options: Options<T> & { required: true }): T;
export function useQueryParam<T = string>(name: string, options: Options<T>): T | undefined;
export function useQueryParam<T = string>(name: string, options?: Options<T>) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const value = searchParams.get(name) as string | undefined;

  if (options?.required && value == null) {
    throw new Error(`${name} is required`);
  }

  if (options?.parser != null && value != null) {
    return options.parser(value);
  }

  return value;
}
