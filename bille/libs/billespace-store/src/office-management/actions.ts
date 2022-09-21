import { officeManagementAllActions } from './slice';

export const officeManagementActions = {
  prepare: officeManagementAllActions.prepare,
  set: officeManagementAllActions.set,
  addOfficeZone: officeManagementAllActions.addOfficeZone,
  updateOfficeZone: officeManagementAllActions.updateOfficeZone,
  deleteOfficeZone: officeManagementAllActions.deleteOfficeZone,
  addParkingZone: officeManagementAllActions.addParkingZone,
  updateParkingZone: officeManagementAllActions.updateParkingZone,
  deleteParkingZone: officeManagementAllActions.deleteParkingZone,
  finish: officeManagementAllActions.finish
};
