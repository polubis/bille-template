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
import { OfficeId, OfficeManagementReducerState } from './models';
import { getSetableState, getSafeValue } from './guards';

export const INITIAL_STATE: OfficeManagementReducerState = {
  current: { stage: 'IDLE' },
};

export const [, officeManagementReducer, officeManagementActions] = slice(
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
    set: (
      s,
      a: Action<{
        key: keyof OfficePayload;
        value: OfficePayload[keyof OfficePayload];
      }>
    ) => {
      const current = getSetableState(s);

      set(current.form, a.payload.key, a.payload.value);
      a.payload.key === 'countryId' && set(current.form, 'cityId', '');
    },
    addOfficeZone: (s, a: Action<string>) => {
      const current = getSetableState(s);

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
    setOfficeZoneName: (
      s,
      { payload: { name, id } }: Action<Pick<OfficeZone, 'name' | 'id'>>
    ) => {
      const current = getSetableState(s);
      const zone = getSafeValue(
        current.form.values.officeZones.find((zone) => zone.id === id)
      );

      set(
        current.form,
        'officeZones',
        update(current.form.values.officeZones, 'id', { ...zone, name })
      );
    },
    setOfficeZoneDesks: (
      s,
      { payload: { desks, id } }: Action<Pick<OfficeZone, 'desks' | 'id'>>
    ) => {
      const current = getSetableState(s);
      const zone = getSafeValue(
        current.form.values.officeZones.find((zone) => zone.id === id)
      );

      set(
        current.form,
        'officeZones',
        update(current.form.values.officeZones, 'id', { ...zone, desks })
      );
    },
    deleteOfficeZone: (s, a: Action<OfficeZone['id']>) => {
      const current = getSetableState(s);

      set(
        current.form,
        'officeZones',
        remove(current.form.values.officeZones, 'id', a.payload)
      );
    },
    addParkingZone: (s, a: Action<string>) => {
      const current = getSetableState(s);

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
    setParkingZoneName: (
      s,
      { payload: { name, id } }: Action<Pick<ParkingZone, 'id' | 'name'>>
    ) => {
      const current = getSetableState(s);
      const zone = getSafeValue(
        current.form.values.parkingZones.find((zone) => zone.id === id)
      );

      set(
        current.form,
        'parkingZones',
        update(current.form.values.parkingZones, 'id', { ...zone, name })
      );
    },
    setParkingZoneSpaces: (
      s,
      { payload: { spaces, id } }: Action<Pick<ParkingZone, 'id' | 'spaces'>>
    ) => {
      const current = getSetableState(s);
      const zone = getSafeValue(
        current.form.values.parkingZones.find((zone) => zone.id === id)
      );

      set(
        current.form,
        'parkingZones',
        update(current.form.values.parkingZones, 'id', { ...zone, spaces })
      );
    },
    deleteParkingZone: (s, a: Action<ParkingZone['id']>) => {
      const current = getSetableState(s);

      set(
        current.form,
        'parkingZones',
        remove(current.form.values.parkingZones, 'id', a.payload)
      );
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
