import type { Meta, StoryObj } from '@storybook/react';
import { ShiftViewSkeleton, ShiftViewSkeletonProps } from '../ShiftViewSkeleton';
import dummyShiftData from '../../../test_data/test_data.json';
import { ShiftContext } from '../../../src/contexts/ShiftContext'; //TODO: need to get the proper way for this path

import dayjs from 'dayjs';

const shiftData = {
  '2025-01-01': dummyShiftData,
  '2025-01-02': dummyShiftData,
  '2025-01-03': dummyShiftData,
};

const props: ShiftViewSkeletonProps = {
  title: 'Forecast vs Actual',
  isDataLoaded: true,
  shiftChartData: [1, 3, 5, 7, 9, 20],
  shiftData: shiftData,
};

// Create a decorator to wrap stories with the context provider
const ShiftDateDecorator = (Story, context) => (
  <ShiftContext.Provider
    value={{
      currentShiftDate: dayjs('2025-01-02'),
      setCurrentShiftDate: () => {},
      customizedHighlightFields: ['gradeAu', 'gradeCu', 'gradeS'],
      setCustomizedHighlightFields: () => {},
    }}
  >
    <Story />
  </ShiftContext.Provider>
);

const meta = {
  title: 'skeleton/ShiftViewSkeleton',
  component: ShiftViewSkeleton,
  decorators: [ShiftDateDecorator], // Apply the decorator globally for this story
} satisfies Meta<typeof ShiftViewSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: props,
};

export const LoadingShift: Story = {
  args: {
    title: 'Test title',
    isDataLoaded: false,
    shiftChartData: [],
    shiftData: {},
  },
};
