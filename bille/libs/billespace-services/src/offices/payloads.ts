export interface CreateOfficePayload {
  address: string;
  postCode: string;
  cityId: string;
  countryId: string;
  officeZones: {
    name: string;
    desks: number;
  }[];
  parkingZones: {
    name: string;
    spaces: number;
  }[];
}
