/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render, screen } from '@testing-library/react';
import { DrawerMenuItem } from '../drawer';
import { Navigation } from './navigation';

describe('<Navigation>', () => {
  const spy = jest.fn();

  const MAIN_ITEM: DrawerMenuItem = {
    link: 'N_L1',
    icon: 'IconMainItem',
    title: 'Main item',
    onClick: () => {},
  };
  const RIGHT_ITEM: DrawerMenuItem = {
    link: 'N_L2',
    icon: 'IconRightItem',
    title: 'Right item',
    onClick: () => {},
  };

  const ITEMS: DrawerMenuItem[] = [
    {
      icon: 'IconDrawer1',
      link: '1/',
      title: 'Offices',
      onClick: () => spy(),
    },
    {
      icon: 'IconDrawer2',
      link: '2/',
      title: 'Create office',
      onClick: () => spy(),
    },
  ];

  it('renders navigation links', () => {
    render(
      <Navigation mainItem={MAIN_ITEM} rightItem={RIGHT_ITEM} items={ITEMS} />
    );

    screen.getByText('IconMainItem');
    screen.getByText('IconRightItem');
  });

  it('renders titles', () => {
    render(
      <Navigation mainItem={MAIN_ITEM} rightItem={RIGHT_ITEM} items={ITEMS} />
    );

    screen.getByTitle('Menu');
    screen.getByTitle('Main item');
    screen.getByTitle('Right item');
  });

  it('allows onClick on drawer items', () => {
    render(
      <Navigation mainItem={MAIN_ITEM} rightItem={RIGHT_ITEM} items={ITEMS} />
    );

    const item = screen.getByTitle('Menu');
    fireEvent.click(item, { target: {} });
    const drawerItem = screen.getByTitle('Offices');
    fireEvent.click(drawerItem, { traget: {} });

    expect(spy).toBeCalledTimes(1);
  });
});
