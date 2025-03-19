import type { Meta, StoryObj } from '@storybook/react';
import { ShiftOverviewSkeleton, ShiftOverviewSkeletonProps } from './ShiftOverviewSkeleton';
import dummyShiftData from '../../../test_data/test_data.json';

const props: ShiftOverviewSkeletonProps = {
  title: 'Today',
  isDataLoaded: true,
  shiftOverviewData: dummyShiftData,
};

const meta = {
  title: 'skeleton/ShiftViews/ShiftOverviewSkeleton',
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
    shiftOverviewData: {},
  },
};
