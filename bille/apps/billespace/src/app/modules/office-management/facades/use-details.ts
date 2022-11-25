import {
  OfficeManagementFormKeys,
  selectOfficeManagementForm,
  useSelector,
} from '@bille/billespace-store';
import { ChangeEvent } from 'react';

export const useDetails = () => {
  const { values, errors } = useSelector(selectOfficeManagementForm);

  const set =
    <K extends OfficeManagementFormKeys>(key: K) =>
    (e: ChangeEvent<HTMLInputElement>): void => {};

  return {
    values,
    errors,
    set,
  };
};
