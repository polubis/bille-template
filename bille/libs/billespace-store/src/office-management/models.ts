import { Country, Office, OfficePayload } from '@bille/billespace-services';
import { FormState } from '@bille/developer-kit';

type OfficeManagementForm = FormState<OfficePayload>;

type OfficeManagementStage =
  | 'IDLE'
  | 'PREPARING'
  | 'PREPARE_FAILED'
  | 'CREATION'
  | 'CREATING'
  | 'CREATE_FAILED'
  | 'CREATED'
  | 'EDITION'
  | 'EDITING'
  | 'EDIT_FAILED'
  | 'EDITED';

export interface OfficeManagementReducerState {
  stage: OfficeManagementStage;
  form?: OfficeManagementForm;
  office?: Office;
  countries?: Country[];
}
