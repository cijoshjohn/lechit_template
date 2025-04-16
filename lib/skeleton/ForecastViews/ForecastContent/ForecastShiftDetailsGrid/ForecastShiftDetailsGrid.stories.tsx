import type { Meta, StoryObj } from '@storybook/react';
import { ForecastShiftDetailsGrid } from './ForecastShiftDetailsGrid';
import { expect, within } from '@storybook/test';

const meta = {
  title: 'skeleton/ForecastViews/ForecastShiftDetailsGrid',
  component: ForecastShiftDetailsGrid,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof ForecastShiftDetailsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
