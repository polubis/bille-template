import {
  officeManagementActions,
  officeManagementSelect,
  useDispatch,
  useSelector,
} from '@bille/billespace-store';
import { DataItem, ItemList } from '@bille/ui';
import { LayoutComponent } from '../components';

const useParkingZones = () => {
  const dispatch = useDispatch();

  const form = useSelector(officeManagementSelect.form);

  const add = (name: string) => {
    dispatch(officeManagementActions.addParkingZone(name));
  };

  const change = ({ name, id }: DataItem) => {
    dispatch(officeManagementActions.setParkingZoneName({ name, id }));
  };

  const remove = (id: string) => {
    dispatch(officeManagementActions.deleteParkingZone(id));
  };

  return {
    form,
    add,
    change,
    remove,
  };
};

export const ParkingZonesController = () => {
  const { form, add, remove, change } = useParkingZones();

  return (
    <LayoutComponent disabled={!!form.errors.parkingZones}>
      <ItemList
        data={form.values.parkingZones}
        onItemAdd={add}
        onDeleteItem={remove}
        onChange={change}
        placeholder="Type parking zone name..."
      />
    </LayoutComponent>
  );
};
