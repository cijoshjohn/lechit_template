import { Meta, StoryObj } from '@storybook/react';
import OdsSingleGaugeChart from './OdsSingleGaugeChart';
import { within, expect } from '@storybook/test';

const meta = {
  title: 'component/Graph/OdsSingleGaugeChart',
  component: OdsSingleGaugeChart,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    gaugevalue: 22,
    title: 'Concentrate',
    titlePosition: 'top',
    footerTitle: 'Gold Recovered',
    unit: 'g/h',
    maxValue: 25,
  },
} satisfies Meta<typeof OdsSingleGaugeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gaugevalue: 22,
    title: 'Concentrate',
    titlePosition: 'top',
    footerTitle: 'Gold Recovered',
    unit: 'g/h',
    maxValue: 25,
  },
};

export const CheckHeading: Story = {
  args: {
    gaugevalue: 22,
    title: 'Concentrate',
    titlePosition: 'top',
    footerTitle: 'Gold Recovered',
    unit: 'g/h',
    maxValue: 25,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const piechart = canvas.getByText('Concentrate');
    await expect(piechart).toBeInTheDocument();
  },
};

export const CheckOnHover: Story = {
  args: {
    gaugevalue: 22,
    title: 'Concentrate',
    titlePosition: 'top',
    footerTitle: 'Gold Recovered',
    unit: 'g/h',
    maxValue: 25,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const svgElement = await canvas.findByRole('img');
    await expect(svgElement).toBeInTheDocument();
  },
};
