import type { Meta, StoryObj } from '@storybook/react';
import { ShiftOverviewSkeleton, ShiftOverviewSkeletonProps } from './ShiftOverviewSkeleton';
import dummyShiftData from '../../test_data/test_data.json';

import { expect, within } from '@storybook/test';

const props: ShiftOverviewSkeletonProps = {
  title: 'Today',
  isDataLoaded: true,
  shiftOverviewData: dummyShiftData,
  customizedHighlightFields: [ 'gradeAu', 'gradeCu', 'gradeS' ]
};

const meta = {
  title: 'skeleton/ShiftOverviewSkeleton',
  component: ShiftOverviewSkeleton,
} satisfies Meta<typeof ShiftOverviewSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: props,
};

export const LoadingShift: Story = {
  args: {
    title: 'Yesterday',
    isDataLoaded: false,
    shiftOverviewData: null,
    customizedHighlightFields: [ 'gradeAu', 'gradeCu', 'gradeS' ]
  }
};

export const DynamicHighlightFields: Story = {
  args: {
    title: 'Yesterday',
    isDataLoaded: true,
    shiftOverviewData: dummyShiftData,
    customizedHighlightFields: [ 'gradeAu', 'testField', 'gradeS' ]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const throughputTxt = canvas.getByText('Throughput');
    await expect(throughputTxt).toBeInTheDocument();
    const p80Txt = canvas.getByText('P80');
    await expect(p80Txt).toBeInTheDocument();
    const solidsTxt = canvas.getByText('Solids');
    await expect(solidsTxt).toBeInTheDocument();

    const dummyFieldTxt = canvas.getByText('DummyField');
    await expect(dummyFieldTxt).toBeInTheDocument();
  }
};
