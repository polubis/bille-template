import { Story, Meta } from '@storybook/react';
import { Detail } from './detail';
import { DetailProps } from './models';

export default {
  component: Detail,
  title: 'Detail',
} as Meta;

const Template: Story<DetailProps> = (args) => <Detail {...args} />;

export const Basic = Template.bind({});
Basic.args = { label: 'Label', value: '19.12.1994' };

export const WithNonStringNodes = Template.bind({});
WithNonStringNodes.args = {
  label: (Label) => <Label>Label</Label>,
  value: (Value) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src="https://img.freepik.com/darmowe-wektory/flaga-usa-lub-tlo-stany-zjednoczone-ameryki_53500-169.jpg?w=2000"
        alt="Flag"
        style={{
          height: '19px',
          width: '100%',
          marginRight: '10px',
        }}
      />
      <Value>USA</Value>
    </div>
  ),
};
