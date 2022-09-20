import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { Input } from './input';
import { InputProps } from './models';

export default {
  component: Input,
  title: 'Input',
} as Meta;

const Template: Story<InputProps> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <div style={{ padding: '16px' }}>
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export const Filled = Template.bind({});
Filled.args = { value: 'Warsaw', placeholder: 'Empty...' };

export const Invalid = Template.bind({});
Invalid.args = { value: 'Warsawo', invalid: true, placeholder: 'Empty...' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true, placeholder: 'Empty...', value: 'Warsaw' };
