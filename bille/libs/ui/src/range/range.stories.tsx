import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { RangeProps } from './models';
import { Range } from './range';

export default {
  component: Range,
  title: 'Range',
} as Meta;

const Template: Story<RangeProps> = (args) => {
  const [value, setValue] = useState(args.value || 0);

  return (
    <div style={{ margin: '16px' }}>
      <Range
        {...args}
        value={value}
        onChange={(e) => setValue(+e.target.value)}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = { title: 'A' };

export const Advanced = Template.bind({});
Advanced.args = {
  title: 'Why do we use it? It is a long established fact that a reader willa',
  min: 100,
  max: 500,
};
