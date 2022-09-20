import { Story, Meta } from '@storybook/react';
import { Rocket } from './rocket';

export default {
  component: Rocket,
  title: 'Rocket',
} as Meta;

const Template: Story = (args) => <Rocket {...args} />;

export const Basic = Template.bind({});
Basic.args = { size: 256 };

export const Size128 = Template.bind({});
Size128.args = { size: 128 };
