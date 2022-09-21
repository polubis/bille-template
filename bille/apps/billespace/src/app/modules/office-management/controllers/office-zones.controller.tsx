import {
  officeManagementActions,
  officeManagementSelect,
  useDispatch,
  useSelector,
} from '@bille/billespace-store';
import { DataItem, ItemList } from '@bille/ui';
import { LayoutComponent } from '../components';

const useOfficeZones = () => {
  const dispatch = useDispatch();

  const form = useSelector(officeManagementSelect.form);

  const add = (name: string) => {
    dispatch(officeManagementActions.addOfficeZone(name));
  };

  const change = ({ name, id }: DataItem) => {
    dispatch(officeManagementActions.setOfficeZoneName({ name, id }));
  };

  const remove = (id: string) => {
    dispatch(officeManagementActions.deleteOfficeZone(id));
  };

  return {
    form,
    add,
    change,
    remove,
  };
};

export const OfficeZonesController = () => {
  const { form, add, change, remove } = useOfficeZones();

  return (
    <LayoutComponent disabled={!!form.errors.officeZones}>
      <ItemList
        data={form.values.officeZones}
        onItemAdd={add}
        onChange={change}
        onDeleteItem={remove}
        placeholder="Type office zone name..."
      />
    </LayoutComponent>
  );
};
