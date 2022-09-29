/* eslint-disable react-hooks/exhaustive-deps */
import { StepsProvider } from '@bille/ui';
import Loadable from 'react-loadable';
import { TITLES } from './config';
import { OfficeManagementProvider } from './logic';

const OfficeManagementController = Loadable({
  loader: () =>
    import('./controllers').then(
      (module: any) => module.OfficeManagementController
    ),
  loading: () => null,
});

export const OfficeManagementModule = () => {
  return (
    <StepsProvider maxStep={TITLES.length}>
      <OfficeManagementProvider>
        <OfficeManagementController />
      </OfficeManagementProvider>
    </StepsProvider>
  );
};
