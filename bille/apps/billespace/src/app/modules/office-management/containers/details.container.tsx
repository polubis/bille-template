import { useSelector, OfficeManagementFormKeys } from '@bille/billespace-store';
import { Input } from '@bille/ui';
import { ChangeEvent } from 'react';
import { Layout } from '../components';

const useDetailsFacade = () => {
  const state = useSelector((state) => state.officeManagementReducer.current);

  const set =
    <K extends OfficeManagementFormKeys>(key: K) =>
    (e: ChangeEvent<HTMLInputElement>): void => {};

  return {
    state,
    set,
  };
};

const DetailsContainer = () => {
  const { state, set } = useDetailsFacade();

  if (state.stage === 'CREATION' || state.stage === 'EDITION') {
    const { address, postCode } = state.form.values;

    return (
      <Layout>
        <Input
          placeholder="Address*"
          data-cy="address-input"
          value={address}
          onChange={set('address')}
        />
        <Input
          data-cy="post-code-input"
          placeholder="Post code*"
          value={postCode}
          onChange={set('postCode')}
        />
      </Layout>
    );
  }

  return null;
};

export { DetailsContainer };
