/* eslint-disable @typescript-eslint/no-empty-function */
import { Story, Meta } from '@storybook/react';
import { Alert, AlertProps } from './alert';

export default {
  component: Alert,
  title: 'Alert',
} as Meta;

const Template: Story<AlertProps> = (args) => (
  <div style={{ margin: '16px' }}>
    <Alert {...args} />
  </div>
);

export const Error = Template.bind({});
Error.args = {
  severity: 'error',
  message: 'This is an error alert',
  onClose: () => {},
};

export const Warning = Template.bind({});
Warning.args = {
  severity: 'warning',
  message: 'This is a warning alert',
  onClose: () => {},
};

export const Info = Template.bind({});
Info.args = {
  severity: 'info',
  message: 'This is an info alert',
  onClose: () => {},
};

export const Success = Template.bind({});
Success.args = {
  severity: 'success',
  message: 'This is a success alert',
  onClose: () => {},
};

