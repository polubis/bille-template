import { useNavigate } from 'react-router-dom';
import { DrawerMenuItem, Navigation } from '@bille/ui';
import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';
import { APP_ROUTES } from '../routing';

export const NavigationController = () => {
  const navigate = useNavigate();

  const items = APP_ROUTES.map(
    (item): DrawerMenuItem => ({
      ...item,
      onClick: () => navigate(item.link),
    })
  );

  return (
    <Navigation
      mainItem={{
        ...APP_ROUTES[0],
        icon: <Icon path={mdiHome} size={1.3} />,
        onClick: () => {
          navigate(APP_ROUTES[0].link);
        },
      }}
      rightItem={{
        ...APP_ROUTES[1],
        onClick: () => {
          navigate(APP_ROUTES[1].link);
        },
      }}
      items={items}
    />
  );
};
