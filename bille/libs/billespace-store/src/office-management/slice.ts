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
  idle: true,
  preparing: false,
  prepareFailed: false,
  creation: false,
  creating: false,
  createFailed: false,
  created: false,
  edition: false,
  editing: false,
  editionFailed: false,
  edited: false,
  form: null,
  countries: [],
  office: null,
};

const setState = (
  state: OfficeManagementReducerState,
  override: Partial<OfficeManagementReducerState>
) => {
  (Object.keys(override) as (keyof OfficeManagementReducerState)[]).forEach(
    (key) => {
      (state[key] as any) = override[key];
    }
  );
};

export const [, officeManagementReducer, officeManagementAllActions] = slice(
  'officeManagement',
  STATE,
  {
    prepare: (s, _: Action<Office['id'] | undefined>) => {
      setState(s, { ...STATE, idle: false, preparing: true });
    },
    prepareFailed: (s) => {
      setState(s, { ...STATE, idle: false, prepareFailed: true });
    },
    creation: (
      s,
      a: Action<{
        countries: Country[];
      }>
    ) => {
      setState(s, {
        ...STATE,
        idle: false,
        creation: true,
        form: initial,
        countries: a.payload.countries,
      });
    },
    edition: (
      s,
      a: Action<{
        office: Office;
        countries: Country[];
      }>
    ) => {
      const { office, countries } = a.payload;

      setState(s, {
        ...STATE,
        idle: false,
        edition: true,
        form: initial,
        office,
        countries,
      });

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
        throw new Error('For is not available yet');
      }

      set(s.form, a.payload.key, a.payload.value);
      a.payload.key === 'countryId' && set(s.form, 'cityId', '');
    },
    addOfficeZone: (s, a: Action<string>) => {
      if (!s.form) {
        throw new Error('For is not available yet');
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
        throw new Error('For is not available yet');
      }

      set(
        s.form,
        'officeZones',
        update(s.form.values.officeZones, 'id', a.payload)
      );
    },
    deleteOfficeZone: (s, a: Action<OfficeZone['id']>) => {
      if (!s.form) {
        throw new Error('For is not available yet');
      }

      set(
        s.form,
        'officeZones',
        remove(s.form.values.officeZones, 'id', a.payload)
      );
    },
    addParkingZone: (s, a: Action<string>) => {
      if (!s.form) {
        throw new Error('For is not available yet');
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
        throw new Error('For is not available yet');
      }

      set(
        s.form,
        'parkingZones',
        update(s.form.values.parkingZones, 'id', a.payload)
      );
    },
    deleteParkingZone: (s, a: Action<ParkingZone['id']>) => {
      if (!s.form) {
        throw new Error('For is not available yet');
      }

      set(
        s.form,
        'parkingZones',
        remove(s.form.values.parkingZones, 'id', a.payload)
      );
    },
    finish: (s) => {
      if (s.edition) {
        setState(s, { edition: false, editing: true });
        return;
      }

      if (s.creation) {
        setState(s, { creation: false, creating: true });
        return;
      }

      throw new Error('Attempt to finish when not ready yet');
    },
    finished: (s) => {
      if (s.editing) {
        setState(s, { editing: false, edited: true });
        return;
      }

      if (s.creating) {
        setState(s, { creating: false, created: true });
        return;
      }

      throw new Error('Attempt to finish when not ready yet');
    },
    finishFailed: (s) => {
      if (s.editing) {
        setState(s, { editing: false, editionFailed: true });
        return;
      }

      if (s.creating) {
        setState(s, { creating: false, createFailed: true });
        return;
      }

      throw new Error('Attempt to finish when not ready yet');
    },
  }
);
