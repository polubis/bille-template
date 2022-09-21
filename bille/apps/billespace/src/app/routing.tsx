import { DrawerMenuItem } from '@bille/ui';
import { ReactNode } from 'react';
import Icon from '@mdi/react';
import { mdiHome, mdiOfficeBuilding } from '@mdi/js';
import { OfficeManagementModule } from './modules/office-management';

export type AppRoute = { Component: () => ReactNode } & Omit<
  DrawerMenuItem,
  'onClick'
>;

export const APP_ROUTES: AppRoute[] = [
  {
    link: '/',
    icon: <Icon path={mdiHome} size={1.3} />,
    title: 'Home',
    Component: () => <div>Home</div>,
  },
  {
    link: '/office-management',
    icon: <Icon path={mdiOfficeBuilding} size={1.3} />,
    title: 'Office management',
    Component: () => <OfficeManagementModule />,
  },
];
