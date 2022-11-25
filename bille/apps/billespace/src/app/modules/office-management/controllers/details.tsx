import { Input } from '@bille/ui';
import { Layout } from '../components';
import { useDetails } from '../facades';

const DetailsController = () => {
  const { values, errors, set } = useDetails();

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

export { DetailsController };
