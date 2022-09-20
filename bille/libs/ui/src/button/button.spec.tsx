import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('<Button>', () => {
  it('displays button with text', () => {
    render(
      <Button motive="orange" shape="rect">
        Create
      </Button>
    );
    screen.getByText('Create');
  });

  it('displays element', () => {
    render(
      <Button motive="orange" shape="rounded">
        <div>A</div>
      </Button>
    );
    screen.getByText('A');
  });
});
