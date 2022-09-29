import { ItemList } from '@bille/ui';
import { LayoutComponent } from '../components';
import {
  useOfficeManagementAction,
  useSafeOfficeManagementState,
} from '../logic';

export const OfficeZonesController = () => {
  const { addOfficeZone, updateOfficeZone, deleteOfficeZone } =
    useOfficeManagementAction();
  const { form } = useSafeOfficeManagementState();

  const invalid = !!form.errors.officeZones;
  const { officeZones } = form.values;

  return (
    <LayoutComponent disabled={invalid}>
      <ItemList
        data={officeZones}
        onItemAdd={addOfficeZone}
        onDeleteItem={deleteOfficeZone}
        onChange={updateOfficeZone}
        placeholder="Type office zone name..."
      />
    </LayoutComponent>
  );
};
