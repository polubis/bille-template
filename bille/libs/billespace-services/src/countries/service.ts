import { Country } from '../common';
import { billespaceAPI } from '../instances';

const service = billespaceAPI.createService({
  name: 'countries',
});

export const loadCountries = service.get<null, Country[]>(null);
