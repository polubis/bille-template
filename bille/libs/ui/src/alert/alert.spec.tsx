/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render, screen } from '@testing-library/react';
import { Alert } from './alert';

describe('<Alert>', () => {
  it('renders alert', () => {
    render(<Alert message="Alert" onClose={() => {}} severity="warning" />);

    screen.getByText('Alert');
  });

  it('allows onClose when clicking close icon', () => {
    const spy = jest.fn();

    render(<Alert message="Alert" onClose={() => spy()} severity="warning" />);

    const closeIcon = screen.getByTestId('close-icon');

    fireEvent.click(closeIcon, { target: {} });

    expect(spy).toBeCalledTimes(1);
  });
});
