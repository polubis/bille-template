/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render, screen } from '@testing-library/react';
import { DrawerMenuItem } from '../drawer';
import { Navbar } from './navbar';

describe('<Navbar>', () => {
  const spy = jest.fn();

  const MAIN_ITEM: DrawerMenuItem = {
    link: 'N_L1',
    icon: 'IconMainItem',
    title: 'Main item',
    onClick: () => spy(),
  };
  const RIGHT_ITEM: DrawerMenuItem = {
    link: 'N_L2',
    icon: 'IconRightItem',
    title: 'Right item',
    onClick: () => spy(),
  };

  it('renders navbar links', () => {
    render(
      <Navbar
        mainItem={MAIN_ITEM}
        rightItem={RIGHT_ITEM}
        onMenuClick={() => {}}
      />
    );

    screen.getByText('IconMainItem');
    screen.getByText('IconRightItem');
  });

  it('renders titles', () => {
    render(
      <Navbar
        mainItem={MAIN_ITEM}
        rightItem={RIGHT_ITEM}
        onMenuClick={() => {}}
      />
    );

    screen.getByTitle('Menu');
    screen.getByTitle('Main item');
    screen.getByTitle('Right item');
  });

  it('allows onClick on items', () => {
    render(
      <Navbar
        mainItem={MAIN_ITEM}
        rightItem={RIGHT_ITEM}
        onMenuClick={() => {}}
      />
    );

    const item = screen.getByTitle('Right item');
    fireEvent.click(item, { target: {} });

    expect(spy).toBeCalledTimes(1);
  });

  it('allows onMenuClick on menu button', () => {
    const spy = jest.fn();

    render(
      <Navbar mainItem={MAIN_ITEM} rightItem={RIGHT_ITEM} onMenuClick={spy} />
    );

    const item = screen.getByTitle('Menu');
    fireEvent.click(item, { target: {} });

    expect(spy).toBeCalledTimes(1);
  });
});
