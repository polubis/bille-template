import { render, screen } from '@testing-library/react';

import { Tile } from './tile';

describe('<Tile>', () => {
  it('renders content', () => {
    render(<Tile>Content</Tile>);
    screen.getByText('Content');
  });
});
