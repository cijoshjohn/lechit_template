import type { Meta, StoryObj } from '@storybook/react';
import { DashboardSkeleton, DashboardSkeletonProps } from './DashboardSkeleton';
import dummyShiftData from '../../test_data/test_data.json';
import dummyShiftDataOther from '../../test_data/other_day.json';
import { ShiftContext } from '../../src/contexts/ShiftContext'; //TODO: need to get the proper way for this path

import dayjs from 'dayjs';

const currentDate = dayjs();

const currentDateStr = currentDate.format('YYYY-MM-DD');
const previousDateStr = currentDate.subtract(1, 'day').format('YYYY-MM-DD');
const previousDateExtraStr = currentDate.subtract(2, 'day').format('YYYY-MM-DD');
const nextDateStr = currentDate.add(1, 'day').format('YYYY-MM-DD');
const nextDateExtraStr = currentDate.add(2, 'day').format('YYYY-MM-DD');

const shiftData = {};
shiftData[previousDateStr] = dummyShiftData;
shiftData[currentDateStr] = dummyShiftData;
shiftData[nextDateStr] = dummyShiftData;
shiftData[previousDateExtraStr] = dummyShiftDataOther;
shiftData[nextDateExtraStr] = dummyShiftDataOther;

const props: DashboardSkeletonProps = {
  shiftChartData: [2, 4, 6, 8, 20],
  title: 'Forecast vs Actual',
  isDataLoaded: true,
  shiftData: shiftData,
};

// Create a decorator to wrap stories with the context provider
const ShiftDateDecorator = (Story, context) => (
  <ShiftContext.Provider
    value={{
      currentShiftDate: currentDate,
      setCurrentShiftDate: () => {},
      customizedHighlightFields: ['gradeAu', 'gradeCu', 'gradeS'],
      setCustomizedHighlightFields: () => {},
    }}
  >
    <Story />
  </ShiftContext.Provider>
);

const meta = {
  title: 'skeleton/DashboardSkeleton',
  component: DashboardSkeleton,
  decorators: [ShiftDateDecorator], // Apply the decorator globally for this story
} satisfies Meta<typeof DashboardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: props,
};

export const LoadingShift: Story = {
  args: {
    shiftChartData: [],
    title: 'Forecast vs Actual',
    isDataLoaded: false,
    shiftData: {},
  },
};
