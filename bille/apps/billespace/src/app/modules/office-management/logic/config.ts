import { OfficePayload } from '@bille/billespace-services';
import {
  address,
  Fns,
  inRange,
  MutableForm,
  notEmpty,
  required,
  unique,
} from '@bille/developer-kit';

const VALUES: OfficePayload = {
  countryId: '',
  cityId: '',
  address: '',
  postCode: '',
  officeZones: [],
  parkingZones: [],
};

export const [MIN_DESKS_COUNT, MAX_DESKS_COUNT] = [1, 100];
export const [MIN_SPACES_COUNT, MAX_SPACES_COUNT] = [1, 50];

const VALIDATORS: Fns<OfficePayload> = {
  countryId: [required()],
  cityId: [required()],
  address: [required(), address()],
  postCode: [required()],
  officeZones: [
    notEmpty(),
    inRange(MIN_DESKS_COUNT, MAX_DESKS_COUNT, 'desks'),
    unique('name'),
  ],
  parkingZones: [
    notEmpty(),
    inRange(MIN_SPACES_COUNT, MAX_SPACES_COUNT, 'spaces'),
    unique('name'),
  ],
};

export const createOfficeForm = (values = VALUES) =>
  MutableForm(values, VALIDATORS);
