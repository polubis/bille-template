import { render, screen } from '@testing-library/react';
import { SelectionDialog, SelectionDialogItem } from './selection-dialog';

describe('<SelectionDialog>', () => {
  it('renders children & title', () => {
    render(
      <SelectionDialog title="My title">
        <SelectionDialogItem key={0}>First</SelectionDialogItem>
        <SelectionDialogItem key={1}>
          <span>A</span>
          <span>Second</span>
        </SelectionDialogItem>
      </SelectionDialog>
    );

    screen.getByText('My title');
    screen.getByText('First');
    screen.getByText('A');
    screen.getByText('Second');
  });
});
