import { Topbar } from '@bille/ui';
import { APP_ROUTES } from '../routing';
import { useLocation } from 'react-router-dom';

export const TopbarController = () => {
  const location = useLocation();

  const title =
    APP_ROUTES.find((item) => item.link === location.pathname)?.title ?? '';

  return (
    <Topbar
      title={title}
      text={title}
      rotating={true}
      src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=391"
    />
  );
};
