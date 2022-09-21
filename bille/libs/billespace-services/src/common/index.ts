export interface City {
  id: string;
  name: string;
}

export interface Country {
  id: string;
  name: string;
  symbol: string;
  cities: City[];
}

export interface OfficeZone {
  id: string;
  name: string;
  desks: number;
}

export interface ParkingZone {
  id: string;
  name: string;
  spaces: number;
}

export interface Office {
  id: string;
  address: string;
  city: City;
  country: Country;
  officeZones: OfficeZone[];
  parkingZones: ParkingZone[];
  postCode: string;
}
