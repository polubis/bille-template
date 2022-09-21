/* eslint-disable react-hooks/exhaustive-deps */
import {
  Office,
  OfficePayload,
  OfficeZone,
  ParkingZone,
} from '@bille/billespace-services';
import { officeManagementActions, useDispatch } from '@bille/billespace-store';

export const useOfficeManagement = () => {
  const dispatch = useDispatch();

  const prepare = (officeId?: Office['id']) => {
    dispatch(officeManagementActions.prepare(officeId));
  };

  const set = <K extends keyof OfficePayload>(
    key: K,
    value: OfficePayload[K]
  ) => {
    dispatch(officeManagementActions.set({ key, value }));
  };

  const addOfficeZone = (name: OfficeZone['name']) => {
    dispatch(officeManagementActions.addOfficeZone(name));
  };

  const updateOfficeZone = (officeZone: OfficeZone) => {
    dispatch(officeManagementActions.updateOfficeZone(officeZone));
  };

  const deleteOfficeZone = (id: OfficeZone['id']) => {
    dispatch(officeManagementActions.deleteOfficeZone(id));
  };

  const addParkingZone = (name: ParkingZone['name']) => {
    dispatch(officeManagementActions.addParkingZone(name));
  };

  const updateParkingZone = (parkingZone: ParkingZone) => {
    dispatch(officeManagementActions.updateParkingZone(parkingZone));
  };

  const deleteParkingZone = (id: ParkingZone['id']) => {
    dispatch(officeManagementActions.deleteParkingZone(id));
  };

  const finish = () => {
    dispatch(officeManagementActions.finish());
  };

  return {
    prepare,
    set,
    addOfficeZone,
    deleteOfficeZone,
    updateOfficeZone,
    addParkingZone,
    updateParkingZone,
    deleteParkingZone,
    finish,
  };
};
