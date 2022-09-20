import { Story, Meta } from '@storybook/react';
import { BarChart, BarChartProps } from './bar-chart';

export default {
  component: BarChart,
  title: 'BarChart',
} as Meta;

const Template: Story<BarChartProps> = (args) => (
  <div style={{ margin: '16px' }}>
    <BarChart {...args} />
  </div>
);

export const Filled = Template.bind({});
Filled.args = {
  data: [10, 10],
};

export const PartiallyFilled = Template.bind({});
PartiallyFilled.args = {
  data: [5, 16],
};

export const Empty = Template.bind({});
Empty.args = {
  data: [0, 10],
};
