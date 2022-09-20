import { Story, Meta } from '@storybook/react';
import { ErrorBoundary, ErrorBoundaryProps } from './error-boundary';

export default {
  component: ErrorBoundary,
  title: 'ErrorBoundary',
} as Meta;

const Template: Story<ErrorBoundaryProps> = (args) => (
  <ErrorBoundary {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  fallback: <div>Error</div>,
  children: <div>Content</div>,
};

const ThrowError = () => {
  throw new Error('Error');
};

export const Error = Template.bind({});
Error.args = {
  fallback: <div>Error</div>,
  children: <ThrowError />,
};
