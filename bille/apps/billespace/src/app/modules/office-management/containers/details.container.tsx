import { Input } from '@bille/ui';
import { Layout } from '../components';

const DetailsContainer = () => {
  return (
    <Layout>
      <Input placeholder="Address*" data-cy="address-input" value={''} />
      <Input data-cy="post-code-input" placeholder="Post code*" value="" />
    </Layout>
  );
};

export { DetailsContainer };
