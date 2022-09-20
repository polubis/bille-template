import { Story, Meta } from '@storybook/react';
import { AvatarProps } from '../avatar/models';
import { TopbarProps } from './models';
import { Topbar } from './topbar';

export default {
  component: Topbar,
  title: 'Topbar',
} as Meta;

const Template: Story<TopbarProps> = (args) => <Topbar {...args} />;

const SRC =
  'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=391';
const TEXT = 'User avatar';
const AVATAR_PROPS: AvatarProps = {
  text: TEXT,
  src: SRC,
  shapes: true,
  shadow: true,
  rotating: true,
};

export const Default = Template.bind({});
Default.args = {
  title: 'Dashboard have too big name to be displayed',
  ...AVATAR_PROPS,
};

export const WithoutAvatar = Template.bind({});
WithoutAvatar.args = {
  title: 'Dashboard have too big name to be displayed',
  hideAvatar: true,
  ...AVATAR_PROPS,
};
