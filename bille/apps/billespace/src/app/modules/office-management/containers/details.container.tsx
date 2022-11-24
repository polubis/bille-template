import {
  useSelector,
  OfficeManagementFormKeys,
  selectOfficeManagementForm,
} from '@bille/billespace-store';
import { Input } from '@bille/ui';
import { ChangeEvent } from 'react';
import { Layout } from '../components';

const useDetailsFacade = () => {
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

const DetailsContainer = () => {
  const { values, errors, set } = useDetailsFacade();

  return (
    <Layout>
      <Input
        placeholder="Address*"
        data-cy="address-input"
        value={values.address}
        invalid={!!errors.address}
        onChange={set('address')}
      />
      <Input
        data-cy="post-code-input"
        placeholder="Post code*"
        value={values.postCode}
        invalid={!!errors.postCode}
        onChange={set('postCode')}
      />
    </Layout>
  );
};

export { DetailsContainer };
