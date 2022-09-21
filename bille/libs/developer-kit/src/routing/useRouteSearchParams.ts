import { useSearchParams } from 'react-router-dom';

export const useRouteSearchParams = <T extends Record<string, string>>() => {
  const [params] = useSearchParams();

  return Object.fromEntries(params as any) as Partial<T>;
};
