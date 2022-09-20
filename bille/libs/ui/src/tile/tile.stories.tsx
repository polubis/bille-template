import { Story, Meta } from '@storybook/react';
import { TileProps } from './models';
import { Tile } from './tile';

export default {
  component: Tile,
  title: 'Tile',
} as Meta;

const Template: Story<TileProps> = (args) => (
  <div style={{ margin: 16 }}>
    <Tile {...args} />
  </div>
);

export const Active = Template.bind({});
Active.args = { children: <div>Content</div>, active: true };

export const Default = Template.bind({});
Default.args = { children: <div>Content</div> };
