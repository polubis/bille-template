import { Story, Meta } from '@storybook/react';
import { List } from './list';
import { ListProps } from './models';

export default {
  component: List,
  title: 'List',
} as Meta;

const Template: Story<ListProps> = (args) => {
  return (
    <div style={{ margin: '16px' }}>
      <List {...args}></List>
    </div>
  );
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'Olsztyn',
  children: [<div key={0}>Content</div>, <div key={1}>Content1</div>],
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
  children: [<div key={0}>Content</div>, <div key={1}>Content1</div>],
};
