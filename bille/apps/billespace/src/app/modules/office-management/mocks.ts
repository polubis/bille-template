import { Country, Office } from '@bille/billespace-services';

// Mocks added only for showcase - you can remove them and mock it on msw layer.
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

export { COUNTRIES, OFFICE };
