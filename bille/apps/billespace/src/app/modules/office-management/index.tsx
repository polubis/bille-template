import Loadable from 'react-loadable';

const Module = Loadable({
  loader: () =>
    import('./office-management.module').then(
      (module) => module.OfficeManagementModule
    ),
  loading: () => null,
});

export const OfficeManagementModule = () => {
  return <Module />;
};
