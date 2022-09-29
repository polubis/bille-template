import { Country, Office, OfficePayload } from "@bille/billespace-services";
import { Formable } from "@bille/developer-kit";

type State<
  S extends string,
  D extends Record<string, unknown> | undefined = undefined
> = D extends undefined
  ? {
      stage: S;
    }
  : D & { stage: S };

type OfficeManagementForm = Formable<OfficePayload>;
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

export type OfficeManagementState = PrepareState | CreationState | EditState;