export interface ParkingZoneDto {
  id: string;
  name: string;
  space: number;
  officeId: string;
}

export interface OfficeZoneDto {
  id: string;
  name: string;
  desk: number;
  officeId: string;
}

export interface CountryDto {
  id: string;
  name: string;
  symbol: string;
}

export interface CityDto {
  id: string;
  countryId: string;
  name: string;
}

export interface OfficeDto {
  id: string;
  address: string;
  city: CityDto;
  country: CountryDto;
  officeZones: OfficeZoneDto[];
  parkingZones: ParkingZoneDto[];
  postCode: string;
}
