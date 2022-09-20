import { useState } from 'react';
import { Drawer, DrawerMenuItem } from '../drawer';
import { Navbar } from '../navbar';

export interface NavigationProps {
  items: DrawerMenuItem[];
  mainItem: DrawerMenuItem;
  rightItem: DrawerMenuItem;
}

export const Navigation = ({ items, mainItem, rightItem }: NavigationProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar
        mainItem={mainItem}
        rightItem={rightItem}
        onMenuClick={() => setOpen(true)}
      />
      {open && <Drawer items={items} onClose={() => setOpen(false)} />}
    </>
  );
};
