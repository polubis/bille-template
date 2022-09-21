import { Outlet, Route, Routes } from 'react-router-dom';
import { Center, ErrorScreen, Layout } from '@bille/ui';
import { APP_ROUTES } from './routing';
import { NavigationController, TopbarController } from './controllers';

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            header={<TopbarController />}
            footer={<NavigationController />}
          >
            <Outlet />
          </Layout>
        }
      >
        {APP_ROUTES.map(({ Component, ...item }) => (
          <Route key={item.link} path={item.link} element={Component()} />
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
