/* eslint-disable @typescript-eslint/no-empty-function */
import { useMemo } from 'react';
import {
  LayoutComponent,
  RangeSelectComponent,
  RangeSelectItem,
} from '../components';
import {
  MAX_DESKS_COUNT,
  MIN_DESKS_COUNT,
  officeManagementActions,
  officeManagementSelect,
  useDispatch,
  useSelector,
} from '@bille/billespace-store';
import { Detail } from '@bille/ui';

const useOfficeDesks = () => {
  const dispatch = useDispatch();

  const form = useSelector(officeManagementSelect.form);
  const desksSum = useSelector(officeManagementSelect.desksSum);

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

  const change = ({ count, id }: RangeSelectItem) => {
    dispatch(
      officeManagementActions.setOfficeZoneDesks({
        id,
        desks: count,
      })
    );
  };

  return {
    items,
    desksSum,
    form,
    change,
  };
};

export const OfficeDesksController = () => {
  const { items, form, desksSum, change } = useOfficeDesks();

  return (
    <LayoutComponent disabled={!!form.errors.officeZones}>
      <RangeSelectComponent
        items={items}
        min={MIN_DESKS_COUNT}
        max={MAX_DESKS_COUNT}
        onChange={change}
      />
      <Detail label="all desks" value={'' + desksSum} />
    </LayoutComponent>
  );
};
