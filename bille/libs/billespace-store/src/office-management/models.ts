import { Country, Office, OfficePayload } from '@bille/billespace-services';
import { FormState } from '@bille/developer-kit';
import { State } from '../abstraction';

type OfficeManagementForm = FormState<OfficePayload>;
export type OfficeId = Office['id'] | undefined;

type PrepareState =
  | State<'IDLE'>
  | State<'PREPARING'>
  | State<'PREPARE_FAILED'>;

type CreationData = { form: OfficeManagementForm; countries: Country[] };

type CreationState =
  | State<'CREATION', CreationData>
  | State<'CREATING'>
  | State<'CREATE_FAILED'>
  | State<'CREATED'>;

type EditData = CreationData & {
  office: Office;
};

type EditState =
  | State<'EDITION', EditData>
  | State<'EDITING'>
  | State<'EDIT_FAILED'>
  | State<'EDITED'>;

export interface OfficeManagementReducerState {
  current: PrepareState | CreationState | EditState;
}
