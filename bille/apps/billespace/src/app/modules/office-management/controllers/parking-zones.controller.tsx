import { getOfficeManagementForm, useSelector } from '@bille/billespace-store';
import { ItemList } from '@bille/ui';
import { LayoutComponent } from '../components';
import { useOfficeManagement } from '../facades';

export const ParkingZonesController = () => {
  const { addParkingZone, updateParkingZone, deleteParkingZone } =
    useOfficeManagement();
  const form = useSelector(getOfficeManagementForm);

  if (!form) {
    throw new Error('Some properties are not available yet');
  }

  const invalid = !!form.errors.parkingZones;
  const { parkingZones } = form.values;

  return (
    <LayoutComponent disabled={invalid}>
      <ItemList
        data={parkingZones}
        onItemAdd={addParkingZone}
        onDeleteItem={deleteParkingZone}
        onChange={updateParkingZone}
        placeholder="Type parking zone name..."
      />
    </LayoutComponent>
  );
};
