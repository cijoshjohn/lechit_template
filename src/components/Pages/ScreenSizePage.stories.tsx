import type { Meta, StoryObj } from '@storybook/react';
import ScreenSizePage from './ScreenSizePage';

const temp = {};

const meta = {
  title: 'pages/ScreenSizeExample',
  component: ScreenSizePage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: temp,
} satisfies Meta<typeof ScreenSizePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: temp,
};
