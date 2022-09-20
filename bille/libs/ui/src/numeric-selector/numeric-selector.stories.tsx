import { Story, Meta } from '@storybook/react';
import { NumericSelectorProps } from './models';
import { NumericSelector, NumericSelectorItem } from './numeric-selector';

export default {
  component: NumericSelector,
  title: 'NumericSelector',
} as Meta;

const Template: Story<NumericSelectorProps> = (args) => {
  return (
    <div style={{ padding: '16px' }}>
      <NumericSelector {...args} />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  title: 'A',
  children: Array.from({ length: 20 }, (_, i) => i).map((i) => (
    <NumericSelectorItem key={i} disabled={i === 3} active={i === 4}>
      {i}
    </NumericSelectorItem>
  )),
};
