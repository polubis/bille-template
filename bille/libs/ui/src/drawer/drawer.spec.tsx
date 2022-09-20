/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render, screen } from '@testing-library/react';
import { Drawer, DrawerMenuItem } from './drawer';

describe('<Drawer>', () => {
  const spy = jest.fn();

  const ITEMS: DrawerMenuItem[] = [
    {
      icon: 'IconDrawer1',
      link: '/1',
      title: 'Offices',
      onClick: () => spy(),
    },
    {
      icon: 'IconDrawer2',
      link: '/2',
      title: 'Create office',
      onClick: () => spy(),
    },
  ];

  it('renders drawer items', () => {
    render(<Drawer onClose={() => {}} items={ITEMS} />);

    screen.getByText('IconDrawer1');
    screen.getByText('IconDrawer2');
  });

  it('renders titles', () => {
    render(<Drawer onClose={() => {}} items={ITEMS} />);

    screen.getByTitle('Offices');
    screen.getByTitle('Create office');
  });

  it('allows onClick on items', () => {
    render(<Drawer onClose={() => {}} items={ITEMS} />);

    const item = screen.getByTitle('Offices');
    fireEvent.click(item, { target: {} });

    expect(spy).toBeCalledTimes(1);
  });

  it('allows onClose in drawer button', () => {
    render(<Drawer onClose={spy} items={ITEMS} />);

    const item = screen.getByTestId('close-button');
    fireEvent.click(item, { target: {} });

    expect(spy).toBeCalledTimes(1);
  });
});
