/* eslint-disable @typescript-eslint/no-empty-function */
import {
  mdiHome,
  mdiOfficeBuilding,
  mdiOfficeBuildingCog,
  mdiQrcode,
} from '@mdi/js';
import Icon from '@mdi/react';
import { Meta, Story } from '@storybook/react';
import { Navigation, NavigationProps } from './navigation';

export default {
  component: Navigation,
  title: 'Navigation',
} as Meta;

const Template: Story<NavigationProps> = (args) => <Navigation {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      icon: <Icon path={mdiOfficeBuilding} size={1.3} color="#323232" />,
      link: '/',
      title: 'Offices',
      onClick: () => {},
    },
    {
      icon: <Icon path={mdiOfficeBuildingCog} size={1.3} color="#323232" />,
      link: '/',
      title: 'Create office',
      onClick: () => {},
    },
  ],
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
};
