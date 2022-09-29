import { ItemList } from '@bille/ui';
import { LayoutComponent } from '../components';
import {
  useOfficeManagementAction,
  useSafeOfficeManagementState,
} from '../logic';

export const ParkingZonesController = () => {
  const { addParkingZone, updateParkingZone, deleteParkingZone } =
    useOfficeManagementAction();
  const { form } = useSafeOfficeManagementState();

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
