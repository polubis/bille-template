import { render, screen } from '@testing-library/react';

import { NoDataScreen } from './no-data-screen';

describe('<NoDataScreen>', () => {
  it('displays title', () => {
    render(<NoDataScreen title="Looks like you dont’ have any data" />);
    screen.getByText('Looks like you dont’ have any data');
  });
});