/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import {
  Alert,
  Center,
  ErrorScreen,
  Heading,
  Rocket,
  Streched,
  useStepsProvider,
} from '@bille/ui';
import Loadable from 'react-loadable';
import { getOfficeManagementStage, useSelector } from '@bille/billespace-store';
import { useOfficeManagement } from '../facades';
import { TITLES } from '../config';
import { useRouteSearchParams } from '@bille/developer-kit';

const OfficeDetailsController = Loadable({
  loader: () =>
    import('./office-details.controller').then(
      (module: any) => module.OfficeDetailsController
    ),
  loading: () => null,
});

const OfficeZonesController = Loadable({
  loader: () =>
    import('./office-zones.controller').then(
      (module: any) => module.OfficeZonesController
    ),
  loading: () => null,
});

const OfficeDesksController = Loadable({
  loader: () =>
    import('./office-desks.controller').then(
      (module: any) => module.OfficeDesksController
    ),
  loading: () => null,
});

const ParkingZonesController = Loadable({
  loader: () =>
    import('./parking-zones.controller').then(
      (module: any) => module.ParkingZonesController
    ),
  loading: () => null,
});

const ParkingSpacesController = Loadable({
  loader: () =>
    import('./parking-spaces.controller').then(
      (module: any) => module.ParkingSpacesController
    ),
  loading: () => null,
});

const SummaryController = Loadable({
  loader: () =>
    import('./summary.controller').then(
      (module: any) => module.SummaryController
    ),
  loading: () => null,
});

const CONTROLLERS = [
  OfficeDetailsController,
  OfficeZonesController,
  OfficeDesksController,
  ParkingZonesController,
  ParkingSpacesController,
  SummaryController,
];

export const OfficeManagementController = () => {
  const { officeId } = useRouteSearchParams<{ officeId: string }>();
  const { prepare } = useOfficeManagement();
  const { step } = useStepsProvider();
  const stage = useSelector(getOfficeManagementStage);

  useEffect(() => prepare(officeId), [officeId]);

  if (stage === 'IDLE') return null;

  if (stage === 'CREATING' || stage === 'EDITING' || stage === 'PREPARING') {
    return (
      <Center>
        <Rocket size={256} />
      </Center>
    );
  }

  if (
    stage === 'CREATE_FAILED' ||
    stage === 'EDIT_FAILED' ||
    stage === 'PREPARE_FAILED'
  ) {
    return (
      <Center>
        <ErrorScreen text="Something went wrong..." />
      </Center>
    );
  }

  if (stage === 'CREATED') {
    return (
      <Center>
        <Alert severity="success" message="Office created!" />
      </Center>
    );
  }

  if (stage === 'EDITED') {
    return (
      <Center>
        <Alert severity="success" message="Edit done!" />
      </Center>
    );
  }

  const Controller = CONTROLLERS[step];

  return (
    <Streched>
      <Heading>{`${TITLES[step]} ${step + 1}/${TITLES.length}`}</Heading>
      <Controller />
    </Streched>
  );
};
