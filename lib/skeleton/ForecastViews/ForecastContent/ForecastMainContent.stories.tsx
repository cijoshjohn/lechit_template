import type { Meta, StoryObj } from '@storybook/react';
import { ForecastMainContent } from '../ForecastMainContent';
import { expect, within } from '@storybook/test';

const meta = {
  title: 'skeleton/DetailsViews/ForecastMainContent',
  component: ForecastMainContent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof ForecastMainContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/* export const CheckContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Adjust Forecast')).toBeInTheDocument();

    await expect(canvas.getByText('Shift View')).toBeInTheDocument();

    await expect(canvas.getByText('Select')).toBeInTheDocument();
  },
}; */
