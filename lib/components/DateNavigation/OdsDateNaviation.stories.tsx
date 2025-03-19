import { Meta, StoryObj } from '@storybook/react';
import { OdsDateNaviation } from './OdsDateNaviation';
import { within, expect } from '@storybook/test';
import dayjs from 'dayjs';

const meta = {
  title: 'component/OdsDateNaviation',
  component: OdsDateNaviation,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    isForward: true,
    iconColor: 'error'
  },
} satisfies Meta<typeof OdsDateNaviation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isForward: true,
    iconColor: 'primary',
    currentDate: dayjs(),
    calculatedDatesCallback: (val: object) => {
      return val;
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const icon = canvas.getByTestId('ArrowForwardIosIcon');
    await expect(icon).toBeInTheDocument();
  },
};

export const Forward: Story = {
  args: {
    isForward: true,
    iconColor: 'primary',
    currentDate: dayjs(),
    calculatedDatesCallback: (val: object) => {
      return val;
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const icon = canvas.getByTestId('ArrowForwardIosIcon');
    await expect(icon).toBeInTheDocument();
  },
};

export const Backward: Story = {
  args: {
    isForward: false,
    iconColor: 'primary',
    currentDate: dayjs(),
    calculatedDatesCallback: (val: object) => {
      return val;
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const icon = canvas.getByTestId('ArrowBackIosIcon');
    await expect(icon).toBeInTheDocument();
  },
};
