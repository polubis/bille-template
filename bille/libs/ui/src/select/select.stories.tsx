import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { SelectProps } from './models';
import { Select, SelectItem } from './select';

export default {
  component: Select,
  title: 'Select',
} as Meta;

const Template: Story<SelectProps> = (args) => {
  const [value, setValue] = useState(args.value);

  return (
    <div style={{ margin: '16px' }}>
      <Select
        {...args}
        title="Select example"
        placeholder="Select something..."
        value={value}
      >
        <SelectItem key={0} motive="gray" onClick={() => setValue('First')}>
          <span>A</span>
          <span>First option is to big to fit screen</span>
        </SelectItem>
        <SelectItem key={1} motive="gray" onClick={() => setValue('Second')}>
          <span>A</span>
          <span>Second option is to big to fit screen</span>
        </SelectItem>
      </Select>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
