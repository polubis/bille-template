import { render, screen } from '@testing-library/react';
import { List } from './list';

describe('<List>', () => {
  it('renders title', () => {
    render(
      <List title={<div>Title</div>}>
        <div>Content</div>
      </List>
    );

    screen.getByText('Title');
  });

  it('renders content', () => {
    render(
      <List>
        <div>Content</div>
      </List>
    );

    screen.getByText('Content');
  });
});
