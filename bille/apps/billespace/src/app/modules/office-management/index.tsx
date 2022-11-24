import Loadable from 'react-loadable';

const Module = Loadable({
  loader: () => import('./office-management.module'),
  loading: () => null,
});

export const OfficeManagementModule = () => {
  return <Module />;
};
