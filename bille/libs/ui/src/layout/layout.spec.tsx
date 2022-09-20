import { render, screen } from '@testing-library/react';

import { Layout } from './layout';

describe('<Layout>', () => {
  it('displays content', () => {
    render(
      <Layout header={<div>Header</div>} footer={<div>Footer</div>}>
        <div>Content</div>
      </Layout>
    );

    screen.getByText('Header');
    screen.getByText('Content');
    screen.getByText('Footer');
  });
});
