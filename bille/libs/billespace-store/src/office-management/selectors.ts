import { sum } from '@bille/developer-kit';
import { createSelector } from '@reduxjs/toolkit';
import { BillespaceState } from '../store';
import { getSetableState, getSafeValue } from './guards';

const getReducer = (state: BillespaceState) => state.officeManagementReducer;

const getForm = createSelector(
  getReducer,
  (reducer) => getSetableState(reducer).form
);

const getCountries = createSelector(
  getReducer,
  (reducer) => getSetableState(reducer).countries
);

const getCountry = createSelector(getForm, getCountries, (form, countries) =>
  countries.find(({ id }) => id === form.values.countryId)
);

const getCity = createSelector(getForm, getCountry, (form, country) =>
  country?.cities.find((city) => city.id === form.values.cityId)
);

const getStage = createSelector(getReducer, ({ current }) => current.stage);

const getDesksSum = createSelector(getForm, (form) =>
  sum(form.values.officeZones, 'desks')
);

const getSpacesSum = createSelector(getForm, (form) =>
  sum(form.values.parkingZones, 'spaces')
);

const getLoadedOffice = createSelector(getReducer, (reducer) =>
  reducer.current.stage === 'EDITION' ? reducer.current.office : undefined
);

const getSafeCity = createSelector(getCity, (city) => getSafeValue(city));

const getSafeCountry = createSelector(getCountry, (country) =>
  getSafeValue(country)
);

export const officeManagementSelect = {
  form: getForm,
  city: getCity,
  country: getCountry,
  countries: getCountries,
  stage: getStage,
  desksSum: getDesksSum,
  spacesSum: getSpacesSum,
  loadedOffice: getLoadedOffice,
  safeCity: getSafeCity,
  safeCountry: getSafeCountry,
};
