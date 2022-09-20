import { render, screen } from '@testing-library/react';

import { ErrorBoundary } from './error-boundary';

describe('<ErrorScreen>', () => {
  it('displays text if no error', () => {
    render(
      <ErrorBoundary
        children={<div>Children</div>}
        fallback={<div>Fallback</div>}
      />
    );
    screen.getByText('Children');
  });
});
