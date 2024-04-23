import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconButton } from './IconButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered'
  },
  argTypes: {},
  args: { onClick: fn() }
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    size: 'lg',
    icon: 'aa',
    muyBello: true
  }
};
