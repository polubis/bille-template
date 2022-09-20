/* eslint-disable @typescript-eslint/no-empty-function */
import { mdiHome, mdiQrcode } from '@mdi/js';
import Icon from '@mdi/react';
import { Meta, Story } from '@storybook/react';
import { Navbar, NavbarProps } from './navbar';

export default {
  component: Navbar,
  title: 'Navbar',
} as Meta;

const Template: Story<NavbarProps> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  mainItem: {
    link: 'N_L1',
    icon: <Icon path={mdiHome} size={1.3} color="white" />,
    title: 'Main item',
    onClick: () => {},
  },
  rightItem: {
    link: 'N_L2',
    icon: <Icon path={mdiQrcode} size={1.3} color="white" />,
    title: 'Right item',
    onClick: () => {},
  },
  onMenuClick: () => {},
};
