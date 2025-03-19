import type { Meta, StoryObj } from '@storybook/react';
import { OdsDateOption } from './OdsDateOption';
import { expect } from '@storybook/test';
import { within } from '@testing-library/react';
import dayjs from 'dayjs';
import UserEvent from '@testing-library/user-event';

const today = dayjs();

const temp = {
  align: 'left',
  currentStartDate: today,
  endDate: today.add(7, 'day'),
  minLimit: today.subtract(30, 'day'),
  maxLimit: today.add(30, 'day'),
};

/** React MUI Date picker with custom options for date selection */
const meta = {
  title: 'component/OdsDateOption',
  component: OdsDateOption,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: temp,
} satisfies Meta<typeof OdsDateOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: temp,
};

const selectMaterialUiSelectOption = async (element: any, optionText: any) =>
  new Promise(async () => {
    // The the button that opens the dropdown, which is a sibling of the input
    const selectButton = element.parentNode.querySelector('[role=combobox]');

    // Open the select dropdown
    UserEvent.click(selectButton);
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Get the dropdown element. We don't use getByRole() because it includes <select>s too.
    const listbox: HTMLElement[] | null = document.body.querySelectorAll('li[role=option]');
    let listItem = null;
    if (listbox) {
      if (listbox.length > 0) {
        for (const listboxElement of listbox) {
          try {
            listItem = within(listboxElement).getByText(optionText);
            break; // Exit the loop after finding the first match
          } catch (error) {
            // Continue to the next listbox element if the option is not found in this one
            continue;
          }
        }
      } else {
        console.error('No listbox element found.');
      }

      if (listItem) {
        UserEvent.click(listItem);
      }
    }
    // Wait for the listbox to be removed, so it isn't visible in subsequent calls
    /* waitForElementToBeRemoved(() => document.body.querySelector('ul[role=listbox]')).then(
              resolve,
          ); */

    await new Promise((resolve) => setTimeout(resolve, 800));
  });

export const TestSelect: Story = {
  args: {
    align: 'left',
    currentStartDate: today.add(1, 'day'),
    endDate: today.add(7, 'day'),
    minLimit: today.subtract(90, 'day'),
    maxLimit: today.add(90, 'day'),
    fixedDateRange: 'unselected',
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    let dropdownMain = await canvas.findByTestId('date-fixed-range');

    selectMaterialUiSelectOption(dropdownMain, 'Tomorrow');
    await new Promise((resolve) => setTimeout(resolve, 600));

    const tomorrow = today.add(1, 'day');
    const newDate = `${tomorrow.year()} , ${tomorrow.format('MMM')} ${tomorrow.date()}`;

    let DateStringElement = canvas.getByText(new RegExp(newDate, 'i'));
    expect(DateStringElement).toBeInTheDocument();
    await new Promise((resolve) => setTimeout(resolve, 600));

    dropdownMain = await canvas.findByTestId('date-fixed-range');
    selectMaterialUiSelectOption(dropdownMain, 'This Month');
    await new Promise((resolve) => setTimeout(resolve, 600));

    let startOfMonth = today.startOf('month');
    let endOfMonth = today.endOf('month');

    const newthismonthDate =
      `${startOfMonth.year()} , ${startOfMonth.format('MMM')} ${startOfMonth.date()}` +
      ' -' +
      endOfMonth.format('MMM') +
      ' ' +
      endOfMonth.date();
    DateStringElement = canvas.getByText(new RegExp(newthismonthDate, 'i'));
    expect(DateStringElement).toBeInTheDocument();
    DateStringElement = canvas.getByText('This Month');
    expect(DateStringElement).toBeInTheDocument();

    await new Promise((resolve) => setTimeout(resolve, 600));
    //check the forward and backward on range

    const difference = endOfMonth.diff(startOfMonth, 'day');
    startOfMonth = endOfMonth;
    endOfMonth = startOfMonth.add(difference, 'day');

    const inputElement: HTMLInputElement = canvas.getByTestId('date-increment');
    inputElement.click();
    await new Promise((resolve) => setTimeout(resolve, 600));
    const newDateString =
      `${startOfMonth.year()} , ${startOfMonth.format('MMM')} ${startOfMonth.date()}` +
      ' -' +
      endOfMonth.format('MMM') +
      ' ' +
      endOfMonth.date();
    const stringVal = canvas.getByText(newDateString);
    expect(stringVal).toBeInTheDocument();
  },
};

export const TestYesterday: Story = {
  args: {
    align: 'left',
    currentStartDate: today.subtract(1, 'day'),
    endDate: today.add(7, 'day'),
    minLimit: today.subtract(30, 'day'),
    maxLimit: today.add(30, 'day'),
    fixedDateRange: '-1',
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    //fireEvent.click(canvas.getByText(/Select/i))

    await expect(canvas.getByText('Yesterday')).toBeInTheDocument();

    const inputElement: HTMLInputElement = canvas.getByRole('textbox');
    void expect(inputElement?.value).toContain(today.subtract(1, 'day').format('YYYY-MM-DD'));
  },
};

export const TestTomorrow: Story = {
  args: {
    align: 'left',
    currentStartDate: today.add(1, 'day'),
    endDate: today.add(7, 'day'),
    minLimit: today.subtract(30, 'day'),
    maxLimit: today.add(30, 'day'),
    fixedDateRange: '1',
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    //fireEvent.click(canvas.getByText(/Select/i))

    await expect(canvas.getByText('Tomorrow')).toBeInTheDocument();

    const inputElement: HTMLInputElement = canvas.getByRole('textbox');
    expect(inputElement?.value).toContain(today.add(1, 'day').format('YYYY-MM-DD'));
  },
};

export const TestForward: Story = {
  args: {
    align: 'left',
    currentStartDate: today,
    endDate: today.add(7, 'day'),
    minLimit: today.subtract(30, 'day'),
    maxLimit: today.add(30, 'day'),
    fixedDateRange: 'unselected',
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const inputElement: HTMLInputElement = canvas.getByTestId('date-increment');
    inputElement.click();
    await new Promise((resolve) => setTimeout(resolve, 600));
    const newDateString = `${today.add(1, 'day').year()} , ${today.add(1, 'day').format('MMM')} ${today.add(1, 'day').date()}`;
    const stringVal = canvas.getByText(newDateString);
    expect(stringVal).toBeInTheDocument();
  },
};

export const TestBackward: Story = {
  args: {
    align: 'left',
    currentStartDate: today,
    endDate: today.add(7, 'day'),
    minLimit: today.subtract(30, 'day'),
    maxLimit: today.add(30, 'day'),
    fixedDateRange: 'unselected',
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const inputElement: HTMLInputElement = canvas.getByTestId('date-decrement');
    inputElement.click();
    await new Promise((resolve) => setTimeout(resolve, 600));
    const newDateString = `${today.subtract(1, 'day').year()} , ${today.subtract(1, 'day').format('MMM')} ${today.subtract(1, 'day').date()}`;
    const stringVal = canvas.getByText(newDateString);
    expect(stringVal).toBeInTheDocument();
  },
};
