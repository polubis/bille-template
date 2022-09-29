/* eslint-disable @typescript-eslint/no-empty-function */
import { useMemo } from 'react';
import {
  LayoutComponent,
  RangeSelectComponent,
  RangeSelectItem,
} from '../components';
import { Detail } from '@bille/ui';
import {
  MAX_SPACES_COUNT,
  MIN_SPACES_COUNT,
  useOfficeManagementAction,
  useSafeOfficeManagementState,
} from '../logic';
import { sum } from '@bille/developer-kit';

export const ParkingSpacesController = () => {
  const { updateParkingZone } = useOfficeManagementAction();
  const { form } = useSafeOfficeManagementState();

  const { parkingZones } = form.values;
  const { items, spaces } = useMemo(
    () => ({
      items: parkingZones.map(
        ({ spaces, ...officeZone }): RangeSelectItem => ({
          ...officeZone,
          count: spaces,
        })
      ),
      spaces: sum(parkingZones, 'spaces'),
    }),
    [parkingZones]
  );

  return (
    <LayoutComponent disabled={!!form.errors.parkingZones}>
      <RangeSelectComponent
        items={items}
        min={MIN_SPACES_COUNT}
        max={MAX_SPACES_COUNT}
        onChange={({ count, ...officeZone }) =>
          updateParkingZone({
            ...officeZone,
            spaces: count,
          })
        }
      />

      <Detail label="all spaces" value={`${spaces}`} />
    </LayoutComponent>
  );
};
