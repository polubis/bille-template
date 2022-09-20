import { render, screen } from '@testing-library/react';

import { InitialScreen } from './initial-screen';

describe('<InitialScreen>', () => {
  it('displays title', () => {
    render(<InitialScreen title="Billespace" />);
    screen.getByText('Billespace');
  });
});
