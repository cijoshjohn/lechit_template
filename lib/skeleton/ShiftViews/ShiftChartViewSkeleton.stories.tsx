import type { Meta, StoryObj } from '@storybook/react';
import { ShiftChartViewSkeleton, ShiftChartViewSkeletonProps } from './ShiftChartViewSkeleton';

const props: ShiftChartViewSkeletonProps = {
  chartData: [2, 4, 6, 8, 20],
};

const meta = {
  title: 'skeleton/ShiftViews/ShiftChartViewSkeleton',
  component: ShiftChartViewSkeleton,
} satisfies Meta<typeof ShiftChartViewSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: props,
};
