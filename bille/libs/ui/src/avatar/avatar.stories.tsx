import { Story, Meta } from '@storybook/react';
import { Avatar } from './avatar';
import { AvatarProps } from './models';

export default {
  component: Avatar,
  title: 'Avatar',
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

const SRC =
  'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=391';
const TEXT = 'User avatar';

export const Basic = Template.bind({});
Basic.args = { src: SRC, text: TEXT };

export const WithShapes = Template.bind({});
WithShapes.args = {
  src: SRC,
  text: TEXT,
  shapes: true,
};

export const WithShadow = Template.bind({});
WithShadow.args = {
  src: SRC,
  text: TEXT,
  shapes: true,
  shadow: true,
};

export const WithLetter = Template.bind({});
WithLetter.args = {
  text: TEXT,
  shapes: true,
  shadow: true,
  letter: 'A',
};

export const Rotating = Template.bind({});
Rotating.args = {
  text: TEXT,
  src: SRC,
  shapes: true,
  shadow: true,
  rotating: true,
};
