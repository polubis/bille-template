import { useRouteSearchParams } from '@bille/developer-kit';

type RouteParams = { officeId: string };

export const useOfficeId = () => {
  const { officeId } = useRouteSearchParams<RouteParams>();

  return officeId;
};
