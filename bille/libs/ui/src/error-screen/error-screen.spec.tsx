import { render, screen } from '@testing-library/react';

import { ErrorScreen } from './error-screen';

describe('<ErrorScreen>', () => {
  it('displays text', () => {
    render(<ErrorScreen text="Text" />);
    screen.getByText('Text');
  });
});
