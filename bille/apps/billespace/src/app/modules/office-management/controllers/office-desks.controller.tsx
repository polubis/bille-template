/* eslint-disable @typescript-eslint/no-empty-function */
import { useMemo } from 'react';
import {
  LayoutComponent,
  RangeSelectComponent,
  RangeSelectItem,
} from '../components';
import { Detail } from '@bille/ui';
import {
  useOfficeManagementAction,
  useSafeOfficeManagementState,
} from '../logic';
import { MAX_DESKS_COUNT, MIN_DESKS_COUNT } from '../logic/config';
import { sum } from '@bille/developer-kit';

export const OfficeDesksController = () => {
  const { form } = useSafeOfficeManagementState();
  const { updateOfficeZone } = useOfficeManagementAction();

  const { officeZones } = form.values;
  const { items, desks } = useMemo(
    () => ({
      items: officeZones.map(
        ({ desks, ...officeZone }): RangeSelectItem => ({
          ...officeZone,
          count: desks,
        })
      ),
      desks: sum(officeZones, 'desks'),
    }),
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

      <Detail label="all desks" value={`${desks}`} />
    </LayoutComponent>
  );
};
