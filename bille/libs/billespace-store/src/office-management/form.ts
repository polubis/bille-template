import {
  address,
  FormState,
  inRange,
  notEmpty,
  ReduxToolkitForm,
  required,
  unique,
} from '@bille/developer-kit';
import { OfficePayload } from '@bille/billespace-services';

export const [MIN_DESKS_COUNT, MAX_DESKS_COUNT] = [1, 100];
export const [MIN_SPACES_COUNT, MAX_SPACES_COUNT] = [1, 100];

export const { initial, set } = ReduxToolkitForm<OfficePayload>(
  {
    countryId: '',
    cityId: '',
    address: '',
    postCode: '',
    officeZones: [],
    parkingZones: [],
  },
  {
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
  }
);

export type OfficeManagementForm = FormState<OfficePayload>;
