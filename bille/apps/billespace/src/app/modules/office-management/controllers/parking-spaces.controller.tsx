/* eslint-disable @typescript-eslint/no-empty-function */
import {
  MAX_SPACES_COUNT,
  MIN_SPACES_COUNT,
  officeManagementActions,
  officeManagementSelect,
  useDispatch,
  useSelector,
} from '@bille/billespace-store';
import { useMemo } from 'react';
import {
  LayoutComponent,
  RangeSelectComponent,
  RangeSelectItem,
} from '../components';
import { Detail } from '@bille/ui';
import { useNavigate } from 'react-router-dom';

const useParkingSpaces = () => {
  const dispatch = useDispatch();

  const form = useSelector(officeManagementSelect.form);
  const spacesSum = useSelector(officeManagementSelect.spacesSum);

  const change = ({ count, id }: RangeSelectItem) => {
    dispatch(
      officeManagementActions.setParkingZoneSpaces({
        id,
        spaces: count,
      })
    );
  };

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

  return {
    form,
    items,
    spacesSum,
    change,
  };
};

export const ParkingSpacesController = () => {
  const { form, items, spacesSum, change } = useParkingSpaces();

  return (
    <LayoutComponent disabled={!!form.errors.parkingZones}>
      <RangeSelectComponent
        items={items}
        min={MIN_SPACES_COUNT}
        max={MAX_SPACES_COUNT}
        onChange={change}
      />

      <Detail label="all spaces" value={'' + spacesSum} />
    </LayoutComponent>
  );
};
