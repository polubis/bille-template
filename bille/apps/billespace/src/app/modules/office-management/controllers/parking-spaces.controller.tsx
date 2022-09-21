/* eslint-disable @typescript-eslint/no-empty-function */
import {
  getOfficeManagementForm,
  getSpacesSum,
  MAX_SPACES_COUNT,
  MIN_SPACES_COUNT,
  useSelector,
} from '@bille/billespace-store';
import { useMemo } from 'react';
import {
  LayoutComponent,
  RangeSelectComponent,
  RangeSelectItem,
} from '../components';
import { useOfficeManagement } from '../facades';
import { Detail } from '@bille/ui';

export const ParkingSpacesController = () => {
  const { updateParkingZone } = useOfficeManagement();
  const form = useSelector(getOfficeManagementForm);
  const sum = useSelector(getSpacesSum);

  if (!form) {
    throw new Error('Some properties are not available yet');
  }

  const { parkingZones } = form.values;
  const items = useMemo(
    () =>
      parkingZones.map(
        ({ spaces, ...officeZone }): RangeSelectItem => ({
          ...officeZone,
          count: spaces,
        })
      ),
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

      <Detail label="all spaces" value={`${sum}`} />
    </LayoutComponent>
  );
};
