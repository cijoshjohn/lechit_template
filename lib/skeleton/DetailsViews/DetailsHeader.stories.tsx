import type { Meta, StoryObj } from '@storybook/react';
import { DetailsHeader, ShiftChartViewSkeletonProps } from './DetailsHeader';
import { expect, within } from '@storybook/test';
import { OdsHighlightDataModel } from 'models/OdsHighlightData';

const firstData: OdsHighlightDataModel = {
  actualColor: 'rgba(0, 118, 166, 1)',
  actualUnit: 'unit1',
  forecastColor: 'rgba(127, 127, 127, 1)',
  actualValue: '30.22',
  dataColor: '',
  dataName: 'XXXXXXX',
  forecastUnit: 'unit1',
  forecastValue: '31.25',
};

const secondData: OdsHighlightDataModel = {
  actualColor: 'rgba(0, 118, 166, 1)',
  actualUnit: 'unit2',
  forecastColor: 'rgba(127, 127, 127, 1)',
  actualValue: '25.25',
  dataColor: '',
  dataName: 'YYYYYYY',
  forecastUnit: 'unit2',
  forecastValue: '24.24',
};

const props: ShiftChartViewSkeletonProps = {
  pageName: 'Details',
  highlightData: [firstData, secondData],
};

const meta = {
  title: 'skeleton/DetailsViews/DetailsHeader',
  component: DetailsHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: props,
} satisfies Meta<typeof DetailsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: props,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pageName = canvas.getByTestId('page-name');
    await expect(pageName).toBeInTheDocument();

    const highlightData = canvas.getAllByTestId('highlight-data');
    await expect(highlightData.length).toBeGreaterThan(0);
  },
};

export const CheckContent: Story = {
  args: props,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('XXXXXXX')).toBeInTheDocument();

    await expect(canvas.getByText('YYYYYYY')).toBeInTheDocument();

    await expect(canvas.getByText('30.22 unit1')).toBeInTheDocument();

    await expect(canvas.getByText('25.25 unit2')).toBeInTheDocument();

    await expect(canvas.getByText('31.25 unit1')).toBeInTheDocument();

    await expect(canvas.getByText('24.24 unit2')).toBeInTheDocument();

    await expect(canvas.getByText('-3.4083%')).toBeInTheDocument();

    await expect(canvas.getByText('4.0000%')).toBeInTheDocument();

    await expect(canvas.getByText('Details')).toBeInTheDocument();
  },
};
