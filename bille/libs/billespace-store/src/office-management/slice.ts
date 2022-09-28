/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Country,
  Office,
  OfficePayload,
  OfficeZone,
  ParkingZone,
} from '@bille/billespace-services';
import { add, id, remove, update } from '@bille/developer-kit';
import { slice, Action } from '../abstraction';
import { initial, set } from './config';
import { MIN_DESKS_COUNT, MIN_SPACES_COUNT } from './consts';
import { OfficeManagementReducerState } from './models';

const STATE: OfficeManagementReducerState = {
  stage: 'IDLE',
};

export const [, officeManagementReducer, officeManagementAllActions] = slice(
  'officeManagement',
  STATE,
  {
    prepare: (s, _: Action<Office['id'] | undefined>) => {
      s.stage = 'PREPARING';
    },
    prepareFailed: (s) => {
      s.stage = 'PREPARE_FAILED';
    },
    creation: (
      s,
      a: Action<{
        countries: Country[];
      }>
    ) => {
      s.stage = 'CREATION';
      s.form = initial;
      s.countries = a.payload.countries;
    },
    edition: (
      s,
      a: Action<{
        office: Office;
        countries: Country[];
      }>
    ) => {
      const { office, countries } = a.payload;

      s.stage = 'EDITION';
      s.form = initial;
      s.office = office;
      s.countries = countries;

      set(s.form, 'cityId', office.city.id);
      set(s.form, 'countryId', office.country.id);
      set(s.form, 'address', office.address);
      set(s.form, 'officeZones', office.officeZones);
      set(s.form, 'parkingZones', office.parkingZones);
      set(s.form, 'postCode', office.postCode);
    },
    set: (
      s,
      a: Action<{
        key: keyof OfficePayload;
        value: OfficePayload[keyof OfficePayload];
      }>
    ) => {
      if (!s.form) {
        throw new Error('Not allowed to set form values');
      }

      set(s.form, a.payload.key, a.payload.value);
      a.payload.key === 'countryId' && set(s.form, 'cityId', '');
    },
    addOfficeZone: (s, a: Action<string>) => {
      if (!s.form) {
        throw new Error('Not allowed to set form values');
      }

      set(
        s.form,
        'officeZones',
        add(s.form.values.officeZones, {
          name: a.payload,
          id: id(),
          desks: MIN_DESKS_COUNT,
        })
      );
    },
    updateOfficeZone: (s, a: Action<OfficeZone>) => {
      if (!s.form) {
        throw new Error('Not allowed to set form values');
      }

      set(
        s.form,
        'officeZones',
        update(s.form.values.officeZones, 'id', a.payload)
      );
    },
    deleteOfficeZone: (s, a: Action<OfficeZone['id']>) => {
      if (!s.form) {
        throw new Error('Not allowed to set form values');
      }

      set(
        s.form,
        'officeZones',
        remove(s.form.values.officeZones, 'id', a.payload)
      );
    },
    addParkingZone: (s, a: Action<string>) => {
      if (!s.form) {
        throw new Error('Not allowed to set form values');
      }

      set(
        s.form,
        'parkingZones',
        add(s.form.values.parkingZones, {
          name: a.payload,
          id: id(),
          spaces: MIN_SPACES_COUNT,
        })
      );
    },
    updateParkingZone: (s, a: Action<ParkingZone>) => {
      if (!s.form) {
        throw new Error('Not allowed to set form values');
      }

      set(
        s.form,
        'parkingZones',
        update(s.form.values.parkingZones, 'id', a.payload)
      );
    },
    deleteParkingZone: (s, a: Action<ParkingZone['id']>) => {
      if (!s.form) {
        throw new Error('Not allowed to set form values');
      }

      set(
        s.form,
        'parkingZones',
        remove(s.form.values.parkingZones, 'id', a.payload)
      );
    },
    finish: (s) => {
      s.stage = s.stage === 'EDITION' ? 'EDITING' : 'CREATING';
    },
    finished: (s) => {
      s.stage = s.stage === 'EDITING' ? 'EDITED' : 'CREATED';
    },
    finishFailed: (s) => {
      s.stage = s.stage === 'EDITING' ? 'EDIT_FAILED' : 'CREATE_FAILED';
    },
  }
);
