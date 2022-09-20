/* eslint-disable @typescript-eslint/no-empty-function */
import { mdiOfficeBuilding, mdiOfficeBuildingCog } from '@mdi/js';
import Icon from '@mdi/react';
import { Meta, Story } from '@storybook/react';
import { Drawer, DrawerProps } from './drawer';

export default {
  component: Drawer,
  title: 'Drawer',
} as Meta;

const Template: Story<DrawerProps> = (args) => {
  return <Drawer {...args} onClose={() => {}} />;
};

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
};
