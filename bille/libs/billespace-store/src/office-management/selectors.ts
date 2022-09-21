import { sum } from '@bille/developer-kit';
import { createSelector } from '@reduxjs/toolkit';
import { BillespaceStore } from '../store';

const getOfficeManagementReducer = (store: BillespaceStore) =>
  store.officeManagementReducer;

export const getOfficeManagementForm = createSelector(
  getOfficeManagementReducer,
  (reducer) =>
    reducer.current.stage === 'IDLE' ||
    reducer.current.stage === 'PREPARING' ||
    reducer.current.stage === 'PREPARE_FAILED'
      ? undefined
      : reducer.current.form
);

export const getOfficeManagementCountries = createSelector(
  getOfficeManagementReducer,
  (reducer) =>
    reducer.current.stage === 'IDLE' ||
    reducer.current.stage === 'PREPARING' ||
    reducer.current.stage === 'PREPARE_FAILED'
      ? undefined
      : reducer.current.countries
);

export const getOfficeManagementSelectedCountry = createSelector(
  getOfficeManagementForm,
  getOfficeManagementCountries,
  (form, countries) =>
    form
      ? (countries ?? []).find(({ id }) => id === form.values.countryId)
      : undefined
);

export const getOfficeManagementSelectedCity = createSelector(
  getOfficeManagementForm,
  getOfficeManagementSelectedCountry,
  (form, country) =>
    form && country
      ? country.cities.find((city) => city.id === form.values.cityId)
      : undefined
);

export const getOfficeManagementStage = createSelector(
  getOfficeManagementReducer,
  ({ current }) => current.stage
);

export const getDesksSum = createSelector(getOfficeManagementForm, (form) =>
  sum(form?.values.officeZones ?? [], 'desks')
);

export const getSpacesSum = createSelector(getOfficeManagementForm, (form) =>
  sum(form?.values.parkingZones ?? [], 'spaces')
);

export const getOfficeManagementLoadedOffice = createSelector(
  getOfficeManagementReducer,
  (reducer) =>
    reducer.current.stage === 'EDITION' ||
    reducer.current.stage === 'EDITING' ||
    reducer.current.stage === 'EDITED' ||
    reducer.current.stage === 'EDIT_FAILED'
      ? reducer.current.office
      : undefined
);
