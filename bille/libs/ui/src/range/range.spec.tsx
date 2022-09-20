/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render, screen } from '@testing-library/react';
import { ChangeEvent } from 'react';

import { Range } from './range';

describe('<Range>', () => {
  it('renders title and range progress', () => {
    render(
      <Range title="A" min={0} max={100} value={50} onChange={() => {}} />
    );

    screen.getByText('A');
    screen.getByText('50/100');
  });

  it('assigns value', () => {
    render(
      <Range title="A" min={0} max={100} value={50} onChange={() => {}} />
    );

    screen.getByDisplayValue('50');
  });

  it('allows to use change event', () => {
    const spy = jest
      .fn()
      .mockImplementation((e: ChangeEvent<HTMLInputElement>) => {
        expect(e.target.value).toBe('70');
      });
    const { container } = render(
      <Range title="A" min={0} max={100} value={50} onChange={spy} />
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const range = container.querySelector('input')!;
    fireEvent.change(range, { target: { value: '70' } });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
