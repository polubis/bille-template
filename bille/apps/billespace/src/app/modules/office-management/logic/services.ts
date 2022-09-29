import {
  Country,
  loadCountries as loadCountriesMethod,
  loadOffice as loadOfficeMethod,
  createOffice as createOfficeMethod,
  editOffice as editOfficeMethod,
  Office,
} from '@bille/billespace-services';

const COUNTRIES: Country[] = [
  {
    id: '0',
    name: 'Poland',
    symbol: 'PL',
    cities: [{ id: '0', name: 'Warsaw' }],
  },
  {
    id: '1',
    name: 'England',
    symbol: 'UK',
    cities: [{ id: '1', name: 'London' }],
  },
  {
    id: '2',
    name: 'USA',
    symbol: 'US',
    cities: [{ id: '2', name: 'California' }],
  },
];
const OFFICE: Office = {
  id: '0',
  address: 'Pileckiego',
  postCode: '123',
  parkingZones: [{ id: '0', name: 'A', spaces: 10 }],
  officeZones: [{ id: '0', name: 'A', desks: 10 }],
  country: COUNTRIES[0],
  city: COUNTRIES[0].cities[0],
};

export const loadCountries = () => loadCountriesMethod.mock(COUNTRIES);
export const loadOffice = () => loadOfficeMethod.mock(OFFICE);
export const createOffice = () => createOfficeMethod.mock(OFFICE);
export const editOffice = () => editOfficeMethod.mock(OFFICE);
