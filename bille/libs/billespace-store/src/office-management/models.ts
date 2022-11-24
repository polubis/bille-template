import { Country, Office } from '@bille/billespace-services';
import { State } from '../abstraction';
import { OfficeManagementForm } from './form';

export type OfficeId = Office['id'] | undefined;

type CreationData = { form: OfficeManagementForm; countries: Country[] };
type EditData = CreationData & {
  office: Office;
};

// Current property is added to make state swap easier.
export interface OfficeManagementReducerState {
  current:
    | State<'IDLE'>
    | State<'PREPARING'>
    | State<'PREPARE_FAILED'>
    | State<'CREATION', CreationData>
    | State<'CREATING'>
    | State<'CREATE_FAILED'>
    | State<'CREATED'>
    | State<'EDITION', EditData>
    | State<'EDITING'>
    | State<'EDIT_FAILED'>
    | State<'EDITED'>;
}
