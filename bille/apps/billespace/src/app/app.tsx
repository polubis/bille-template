import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  Center,
  DrawerMenuItem,
  ErrorScreen,
  Layout,
  Navigation,
  Topbar,
} from '@bille/ui';
import Icon from '@mdi/react';
import { mdiHome, mdiOfficeBuilding } from '@mdi/js';

type PartialDrawerMenuItem = Omit<DrawerMenuItem, 'onClick'>;

export const DRAWER_ITEMS: PartialDrawerMenuItem[] = [
  {
    link: '/',
    icon: <Icon path={mdiHome} size={1.3} />,
    title: 'Home',
  },
  {
    link: '/office-management',
    icon: <Icon path={mdiOfficeBuilding} size={1.3} />,
    title: 'Office management',
  },
];

const RootElement = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const drawerItems = DRAWER_ITEMS.map(
    (item): DrawerMenuItem => ({
      ...item,
      onClick: () => navigate(item.link),
    })
  );

  const title =
    DRAWER_ITEMS.find((item) => item.link === location.pathname)?.title ?? '';

  return (
    <Layout
      header={
        <Topbar
          title={title}
          text={title}
          src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=391"
        />
      }
      footer={
        <Navigation
          mainItem={{
            ...DRAWER_ITEMS[0],
            icon: <Icon path={mdiHome} size={1.3} />,
            onClick: () => {
              navigate(DRAWER_ITEMS[0].link);
            },
          }}
          rightItem={{
            ...DRAWER_ITEMS[1],
            onClick: () => {
              navigate(DRAWER_ITEMS[1].link);
            },
          }}
          items={drawerItems}
        />
      }
    >
      <Outlet />
    </Layout>
  );
};

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootElement />}>
        {DRAWER_ITEMS.map((item) => (
          <Route
            key={item.link}
            path={item.link}
            element={<div>{item.title}</div>}
          />
        ))}
        <Route
          path="*"
          element={
            <Center>
              <ErrorScreen text="Page not found" />
            </Center>
          }
        />
      </Route>
    </Routes>
  );
}
