import { Story, Meta } from '@storybook/react';
import { NoDataScreen, NoDataScreenProps } from './no-data-screen';

export default {
  component: NoDataScreen,
  title: 'NoDataScreen',
} as Meta;

const Template: Story<NoDataScreenProps> = (args) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
      }}
    >
      <NoDataScreen {...args} />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = { title: 'Looks like you dont have any data' };