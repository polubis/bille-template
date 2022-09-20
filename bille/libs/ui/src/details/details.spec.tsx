import { render, screen } from '@testing-library/react';
import { Details } from '../details/details';

describe('<Details>', () => {
  it('renders children', () => {
    render(
      <Details>
        <div>Content1</div>
        <div>Content2</div>
      </Details>
    );

    screen.getByText('Content1');
    screen.getByText('Content2');
  });
});
