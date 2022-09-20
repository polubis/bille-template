import { Meta, Story } from '@storybook/react';
import { Details } from './details';
import { DetailsProps } from './models';

export default {
  component: Details,
  title: 'Details',
} as Meta;

const Template: Story<DetailsProps> = (args) => <Details {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: Array.from({ length: 10 }, (_, i) => i).map((i) => (
    <div key={0}>Content {i + 1}</div>
  )),
};
