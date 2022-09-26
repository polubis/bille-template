import { Country, Office, OfficePayload } from '@bille/billespace-services';
import { FormState } from '@bille/developer-kit';

type OfficeManagementForm = FormState<OfficePayload>;

export interface OfficeManagementReducerState {
  idle: boolean;
  preparing: boolean;
  prepareFailed: boolean;
  creation: boolean;
  creating: boolean;
  createFailed: boolean;
  created: boolean;
  edition: boolean;
  editing: boolean;
  editionFailed: boolean;
  edited: boolean;
  form: OfficeManagementForm | null;
  countries: Country[];
  office: Office | null;
}
