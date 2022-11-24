/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Country, Office } from '@bille/billespace-services';
import { createSlice, Action } from '../abstraction';
import { initial, set } from './form';
import { INITIAL_STATE, OfficeId } from './models';

export const [, officeManagementReducer, officeManagementActions] = createSlice(
  'officeManagement',
  INITIAL_STATE,
  {
    prepare: (s, _: Action<OfficeId>) => {
      s.current = { stage: 'PREPARING' };
    },
    prepareFailed: (s) => {
      s.current = { stage: 'PREPARE_FAILED' };
    },
    creation: (
      s,
      a: Action<{
        countries: Country[];
      }>
    ) => {
      s.current = {
        stage: 'CREATION',
        form: initial,
        countries: a.payload.countries,
      };
    },
    edition: (
      s,
      a: Action<{
        office: Office;
        countries: Country[];
      }>
    ) => {
      const { office, countries } = a.payload;

      s.current = {
        stage: 'EDITION',
        form: initial,
        office,
        countries,
      };
      set(s.current.form, 'cityId', office.city.id);
      set(s.current.form, 'countryId', office.country.id);
      set(s.current.form, 'address', office.address);
      set(s.current.form, 'officeZones', office.officeZones);
      set(s.current.form, 'parkingZones', office.parkingZones);
      set(s.current.form, 'postCode', office.postCode);
    },
    finish: (_, __: Action<OfficeId>) => {},
    creating: (s) => {
      s.current = { stage: 'CREATING' };
    },
    created: (s) => {
      s.current = { stage: 'CREATED' };
    },
    createFailed: (s) => {
      s.current = { stage: 'CREATE_FAILED' };
    },
    editing: (s) => {
      s.current = { stage: 'EDITING' };
    },
    edited: (s) => {
      s.current = { stage: 'EDITED' };
    },
    editFailed: (s) => {
      s.current = { stage: 'EDIT_FAILED' };
    },
  }
);
