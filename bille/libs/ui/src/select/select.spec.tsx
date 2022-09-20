/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render, screen } from '@testing-library/react';

import { Select, SelectItem } from './select';

describe('<Select>', () => {
  const renderSelect = () => {
    return (
      <Select
        title="Select example"
        placeholder="Select something..."
        value="Value"
      >
        <SelectItem key={0} motive="gray" onClick={() => {}}>
          <span>A</span>
          <span>First option is to big to fit screen</span>
        </SelectItem>
        <SelectItem key={1} motive="gray" onClick={() => {}}>
          <span>A</span>
          <span>Second option is to big to fit screen</span>
        </SelectItem>
      </Select>
    );
  };

  it('renders placeholder', () => {
    render(renderSelect());

    screen.getByPlaceholderText('Select something...');
  });

  it('renders value', () => {
    render(renderSelect());

    screen.getByDisplayValue('Value');
  });

  it('displays title & items', () => {
    render(renderSelect());

    fireEvent.click(screen.getByDisplayValue('Value'));

    screen.getByText('First option is to big to fit screen');
    screen.getByText('Second option is to big to fit screen');
    screen.getByText('Select example');
  });
});
