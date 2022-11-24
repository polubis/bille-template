import { ReactElement } from 'react';
import { DrawerMenuItem, Layout, Navigation, Topbar } from '@bille/ui';
import { APP_ROUTES } from '../../routing';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';

interface AppLayoutProps {
  children: ReactElement;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = APP_ROUTES.map(
    (item): DrawerMenuItem => ({
      ...item,
      onClick: () => navigate(item.link),
    })
  );

  const title =
    APP_ROUTES.find((item) => item.link === location.pathname)?.title ?? '';

  const [HOME_ROUTE, OFFICE_MANAGEMENT_ROUTE] = APP_ROUTES;

  return (
    <Layout
      header={
        <Topbar
          title={title}
          text={title}
          rotating
          src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=391"
        />
      }
      footer={
        <Navigation
          mainItem={{
            ...HOME_ROUTE,
            icon: <Icon path={mdiHome} size={1.3} />,
            onClick: () => {
              navigate(HOME_ROUTE.link);
            },
          }}
          rightItem={{
            ...OFFICE_MANAGEMENT_ROUTE,
            onClick: () => {
              navigate(OFFICE_MANAGEMENT_ROUTE.link);
            },
          }}
          items={items}
        />
      }
    >
      {children}
    </Layout>
  );
};
