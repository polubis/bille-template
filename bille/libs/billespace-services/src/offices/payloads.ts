import { OfficeZone, ParkingZone } from '../common';

export interface OfficePayload {
  address: string;
  postCode: string;
  cityId: string;
  countryId: string;
  officeZones: OfficeZone[];
  parkingZones: ParkingZone[];
}
