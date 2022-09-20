import { render, screen } from '@testing-library/react';

import { Detail } from './detail';

describe('<Detail>', () => {
  it('renders plain text', () => {
    render(<Detail label="Label" value="Value" />);

    screen.getByText('Label');
    screen.getByText('Value');
  });

  it('allows customize', () => {
    render(
      <Detail
        label={(Label) => <Label>Label</Label>}
        value={(Value) => <Value>Value</Value>}
      />
    );

    screen.getByText('Label');
    screen.getByText('Value');
  });
});
