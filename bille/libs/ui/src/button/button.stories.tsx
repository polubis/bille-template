import { Meta, Story } from '@storybook/react';
import { Button } from './button';
import { ButtonProps } from './models';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Create = Template.bind({});
Create.args = {
  motive: 'orange',
  shape: 'rect',
  children: 'Create',
};

export const OutlinedGray = Template.bind({});
OutlinedGray.args = {
  motive: 'outlinedGray',
  shape: 'rect',
  children: 'Content',
};

export const Gray = Template.bind({});
Gray.args = {
  motive: 'gray',
  shape: 'rect',
  children: 'Content',
};

export const Disabled = Template.bind({});
Disabled.args = {
  motive: 'gray',
  shape: 'rect',
  children: 'Content',
  disabled: true,
};

export const Rounded = Template.bind({});
Rounded.args = {
  motive: 'orange',
  shape: 'rounded',
  children: (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 8H1M9 16V8V16ZM9 8V0V8ZM9 8H17H9Z"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};
