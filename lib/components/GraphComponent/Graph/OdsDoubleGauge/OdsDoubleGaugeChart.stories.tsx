import { Meta, StoryObj } from '@storybook/react';
import OdsDoubleGaugeChart from './OdsDoubleGaugeChart';
import { within, expect } from '@storybook/test';

const meta = {
  title: 'component/Graph/OdsDoubleGaugeChart',
  component: OdsDoubleGaugeChart,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    actual: 23,
    forecast: 23,
    title: 'test',
    titlePosition: 'top',
    maxValue: 25,
  },
} satisfies Meta<typeof OdsDoubleGaugeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actual: 22,
    forecast: 23,
    title: 'Actual vs Forecast',
    titlePosition: 'top',
    maxValue: 25,
  },
};

export const CheckHeading: Story = {
  args: {
    actual: 20,
    forecast: 23,
    title: 'Actual vs Forecast',
    titlePosition: 'top',
    maxValue: 25,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const piechart = canvas.getByText('Actual vs Forecast');
    await expect(piechart).toBeInTheDocument();
  },
};

export const CheckOnHover: Story = {
  args: {
    actual: 22,
    forecast: 23,
    title: 'Actual vs Forecast',
    titlePosition: 'top',
    maxValue: 25,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const svgElement = await canvas.findByRole('img');
    await expect(svgElement).toBeInTheDocument();
  },
};
