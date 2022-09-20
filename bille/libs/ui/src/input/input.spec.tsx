/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from './input';

describe('<Input>', () => {
  it('assigns value', () => {
    render(<Input value="Warsaw" onChange={() => {}} />);
    screen.getByDisplayValue('Warsaw');
  });

  it('assigns placeholder', () => {
    render(<Input value="" placeholder="Text" onChange={() => {}} />);
    screen.getByPlaceholderText('Text');
  });

  it('allows to listen for change event', () => {
    const spy = jest.fn();

    render(<Input value="text" onChange={spy} />);

    const input = screen.getByDisplayValue('text');
    fireEvent.change(input, { target: { value: 'text1' } });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
