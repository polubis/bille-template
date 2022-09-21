import { OfficeManagementReducerState } from './models';

export const getSetableState = ({ current }: OfficeManagementReducerState) => {
  if (current.stage === 'CREATION' || current.stage === 'EDITION') {
    return current;
  }

  throw new Error(
    `Trying to read or update in invalid stage: ${current.stage}`
  );
};

export const getSafeValue = <T>(value: T | undefined): T | never => {
  if (value !== undefined) {
    return value;
  }

  throw new Error(
    'Value cannot be undefined in this moment. You did something wrong'
  );
};
