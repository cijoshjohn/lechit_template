import type { Meta, StoryObj } from '@storybook/react';
import { OdsHighlightData } from './OdsHighlightData';
import { FeedDetails, FeedDetailsProps } from './FeedDetails';
import { day1 } from '../../../src/stories/assets/StubShiftData';

import { expect, within } from '@storybook/test';

const temp: FeedDetailsProps = {
  shiftData: day1,
  sizePx: 5,
};

const meta = {
  title: 'component/FeedDetails',
  component: FeedDetails,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: temp,
} satisfies Meta<typeof FeedDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestCheckAllText: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    let element = canvas.getByText('Feed');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('13,564.900');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('Cu (%)');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('1.500');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('Throughput (tph)');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('1,234.560');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('P80 (μm)');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('Solids (%)');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('53.200');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('pH');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('10.200');
    await expect(element).toBeInTheDocument();
  },
};
