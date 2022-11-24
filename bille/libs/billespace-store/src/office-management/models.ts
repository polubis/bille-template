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
    | State<'IDLE'> // Nothing happens
    | State<'PREPARING'> // Initial data starts loading
    | State<'PREPARE_FAILED'> // Somethng went wrong with init data load
    | State<'CREATION', CreationData> // Data loaded and user will populate form
    | State<'CREATING'> // User finished and confirmed
    | State<'CREATE_FAILED'> // Something wennt wrong when user trying to create office
    | State<'CREATED'> // Office created - end of process
    | State<'EDITION', EditData> // Data loaded for edit office, user will change pre-populated data
    | State<'EDITING'> // User finished edition and confirmed
    | State<'EDIT_FAILED'> // Something went wrong with edition
    | State<'EDITED'>; // Office edited - process finished
}

export const INITIAL_STATE: OfficeManagementReducerState = {
  current: { stage: 'IDLE' },
};
