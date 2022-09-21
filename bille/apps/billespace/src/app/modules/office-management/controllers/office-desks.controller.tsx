/* eslint-disable @typescript-eslint/no-empty-function */
import { useMemo } from 'react';
import { useOfficeManagement } from '../facades';
import {
  LayoutComponent,
  RangeSelectComponent,
  RangeSelectItem,
} from '../components';
import {
    getDesksSum,
  getOfficeManagementForm,
  MAX_DESKS_COUNT,
  MIN_DESKS_COUNT,
  useSelector,
} from '@bille/billespace-store';
import { Detail } from '@bille/ui';

export const OfficeDesksController = () => {
  const { updateOfficeZone } = useOfficeManagement();
  const form = useSelector(getOfficeManagementForm);
  const sum = useSelector(getDesksSum);

  if (!form) {
    throw new Error('Some properties are not available yet');
  }

  const { officeZones } = form.values;
  const items = useMemo(
    () =>
      officeZones.map(
        ({ desks, ...officeZone }): RangeSelectItem => ({
          ...officeZone,
          count: desks,
        })
      ),
    [officeZones]
  );

  return (
    <LayoutComponent disabled={!!form.errors.officeZones}>
      <RangeSelectComponent
        items={items}
        min={MIN_DESKS_COUNT}
        max={MAX_DESKS_COUNT}
        onChange={({ count, ...officeZone }) =>
          updateOfficeZone({
            ...officeZone,
            desks: count,
          })
        }
      />

      <Detail label="all desks" value={`${sum}`} />
    </LayoutComponent>
  );
};
