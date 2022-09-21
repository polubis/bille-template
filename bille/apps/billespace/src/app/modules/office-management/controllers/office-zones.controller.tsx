import { getOfficeManagementForm, useSelector } from '@bille/billespace-store';
import { ItemList } from '@bille/ui';
import { LayoutComponent } from '../components';
import { useOfficeManagement } from '../facades';

export const OfficeZonesController = () => {
  const { addOfficeZone, updateOfficeZone, deleteOfficeZone } =
    useOfficeManagement();
  const form = useSelector(getOfficeManagementForm);

  if (!form) {
    throw new Error('Some properties are not available yet');
  }

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
