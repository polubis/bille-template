import { OfficeManagementReducerState } from './models';

// Allows to use current only when stage is 'CREATION' or 'EDITION'
export const getSetableState = ({ current }: OfficeManagementReducerState) => {
  if (current.stage === 'CREATION' || current.stage === 'EDITION') {
    return current;
  }

  throw new Error(
    `Trying to read or update in invalid stage: ${current.stage}`
  );
};
