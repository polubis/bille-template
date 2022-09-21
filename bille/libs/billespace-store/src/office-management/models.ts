import { Country, Office, OfficePayload } from '@bille/billespace-services';
import { FormState } from '@bille/developer-kit';
import { State } from '../abstraction';

type OfficeManagementForm = FormState<OfficePayload>;

type PrepareState =
  | State<'IDLE'>
  | State<'PREPARING'>
  | State<'PREPARE_FAILED'>;

type CreationData = { form: OfficeManagementForm; countries: Country[] };

type CreationState =
  | State<'CREATION', CreationData>
  | State<'CREATING', CreationData>
  | State<'CREATE_FAILED', CreationData>
  | State<'CREATED', CreationData>;

type EditData = CreationData & {
  office: Office;
};

type EditState =
  | State<'EDITION', EditData>
  | State<'EDITING', EditData>
  | State<'EDIT_FAILED', EditData>
  | State<'EDITED', EditData>;

export interface OfficeManagementReducerState {
  current: PrepareState | CreationState | EditState;
}
