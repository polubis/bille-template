import { Story, Meta } from '@storybook/react';
import { ErrorScreen, ErrorScreenProps } from './error-screen';

export default {
  component: ErrorScreen,
  title: 'ErrorScreen',
} as Meta;

const Template: Story<ErrorScreenProps> = (args) => <ErrorScreen {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  text: 'Error message',
};

export const FullHeight = Template.bind({});
FullHeight.args = {
  text: 'Error message',
  fullHeight: true,
};
