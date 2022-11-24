import { Outlet, Route, Routes } from 'react-router-dom';
import { Center, ErrorScreen } from '@bille/ui';
import { APP_ROUTES } from './routing';
import { AppLayout } from './components';

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <Outlet />
          </AppLayout>
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
};
