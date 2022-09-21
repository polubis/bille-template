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

const STATE: OfficeManagementReducerState = { current: { stage: 'IDLE' } };

const getSetableState = (current: OfficeManagementReducerState['current']) => {
  if (current.stage === 'EDITION' || current.stage === 'CREATION') {
    return current;
  }

  throw new Error('Trying to set form value in invalid stage');
};

export const [, officeManagementReducer, officeManagementAllActions] = slice(
  'officeManagement',
  STATE,
  {
    prepare: (s, _: Action<Office['id'] | undefined>) => {
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
    set: (
      s,
      a: Action<{
        key: keyof OfficePayload;
        value: OfficePayload[keyof OfficePayload];
      }>
    ) => {
      const current = getSetableState(s.current);

      set(current.form, a.payload.key, a.payload.value);
      a.payload.key === 'countryId' && set(current.form, 'cityId', '');
    },
    addOfficeZone: (s, a: Action<string>) => {
      const current = getSetableState(s.current);

      set(
        current.form,
        'officeZones',
        add(current.form.values.officeZones, {
          name: a.payload,
          id: id(),
          desks: MIN_DESKS_COUNT,
        })
      );
    },
    updateOfficeZone: (s, a: Action<OfficeZone>) => {
      const current = getSetableState(s.current);

      set(
        current.form,
        'officeZones',
        update(current.form.values.officeZones, 'id', a.payload)
      );
    },
    deleteOfficeZone: (s, a: Action<OfficeZone['id']>) => {
      const current = getSetableState(s.current);

      set(
        current.form,
        'officeZones',
        remove(current.form.values.officeZones, 'id', a.payload)
      );
    },
    addParkingZone: (s, a: Action<string>) => {
      const current = getSetableState(s.current);

      set(
        current.form,
        'parkingZones',
        add(current.form.values.parkingZones, {
          name: a.payload,
          id: id(),
          spaces: MIN_SPACES_COUNT,
        })
      );
    },
    updateParkingZone: (s, a: Action<ParkingZone>) => {
      const current = getSetableState(s.current);

      set(
        current.form,
        'parkingZones',
        update(current.form.values.parkingZones, 'id', a.payload)
      );
    },
    deleteParkingZone: (s, a: Action<ParkingZone['id']>) => {
      const current = getSetableState(s.current);

      set(
        current.form,
        'parkingZones',
        remove(current.form.values.parkingZones, 'id', a.payload)
      );
    },
    finish: (s) => {
      s.current.stage = s.current.stage === 'EDITION' ? 'EDITING' : 'CREATING';
    },
    finished: (s) => {
      s.current.stage = s.current.stage === 'EDITING' ? 'EDITED' : 'CREATED';
    },
    finishFailed: (s) => {
      s.current.stage =
        s.current.stage === 'EDITING' ? 'EDIT_FAILED' : 'CREATE_FAILED';
    },
  }
);
