import type { Meta, StoryObj } from '@storybook/react';
import { OdsHighlightData } from './OdsHighlightData';
import { OdsHighlightDataModel } from 'models/OdsHighlightData';

import { expect, within } from '@storybook/test';

const temp: OdsHighlightDataModel = {
  dataName: 'Throughput',
  dataColor: '',
  actualValue: 200,
  actualColor: 'rgba(0, 118, 166, 1)',
  actualUnit: 'ppm',
  forecastValue: 100,
  forecastColor: 'rgba(127, 127, 127, 1)',
  forecastUnit: 'ppm',
};

const meta = {
  title: 'component/OdsHighlightData',
  component: OdsHighlightData,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    data: temp,
  },
} satisfies Meta<typeof OdsHighlightData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: temp,
    sizePx: '100',
  },
};

export const TestCheckAllText: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    let logoutButton = canvas.getByText('Throughput');
    await expect(logoutButton).toBeInTheDocument();

    logoutButton = canvas.getByText('200 ppm');
    await expect(logoutButton).toBeInTheDocument();

    logoutButton = canvas.getByText('100 ppm');
    await expect(logoutButton).toBeInTheDocument();

    logoutButton = canvas.getByText('50');
    await expect(logoutButton).toBeInTheDocument();
  },
};
