import { Story, Meta } from '@storybook/react';
import { Props } from './models';
import {
  Heading as HeadingStory,
  Title as TitleStory,
  Label as LabelStory,
  Description as DescriptionStory,
  SmallTitle as SmallTitleStory,
} from './typography';

export default {
  title: 'Typography',
} as Meta;

const Template: Story<Props> = (args) => (
  <div style={{ margin: '16px' }}>{args.value}</div>
);

export const Heading = Template.bind({});
Heading.args = {
  value: <HeadingStory>Reservation details</HeadingStory>,
};

export const Title = Template.bind({});
Title.args = {
  value: <TitleStory>Open space 1</TitleStory>,
};

export const SmallTitle = Template.bind({});
SmallTitle.args = {
  value: <SmallTitleStory>Desk will be asigned automatically</SmallTitleStory>,
};

export const Label = Template.bind({});
Label.args = {
  value: <LabelStory>POLAND</LabelStory>,
};

export const Description = Template.bind({});
Description.args = {
  value: (
    <DescriptionStory>Desk will be asigned automatically</DescriptionStory>
  ),
};
