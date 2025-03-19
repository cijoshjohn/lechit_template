import type { Meta, StoryObj } from '@storybook/react';
import { OdsGridComponent } from './OdsGridComponent';

import { expect, within } from '@storybook/test';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 190,
    //valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 11, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 22, lastName: 'Lannister1', firstName: 'Cersei', age: 42 },
  { id: 33, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 44, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 55, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
];

const temp = {
  gridRows: rows,
  gridColumns: columns,
  gridPageSize: 2,
};

const meta = {
  title: 'component/OdsGridComponent',
  component: OdsGridComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: temp,
} satisfies Meta<typeof OdsGridComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: temp,
};

export const TestCheckRowText: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await new Promise((resolve) => setTimeout(resolve, 600));

    rows.forEach((element) => {
      for (const key in element) {
        if (Object.prototype.hasOwnProperty.call(element, key)) {
          if (element[key]) {
            let textCom = canvas.getByText(element[key]);
            expect(textCom).toBeInTheDocument();
          }
        }
      }
    });
  },
};

export const TestCheckColumnText: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await new Promise((resolve) => setTimeout(resolve, 600));

    columns.forEach((element) => {
      for (const key in element) {
        if (key == 'headerName') {
          if (Object.prototype.hasOwnProperty.call(element, key)) {
            if (element[key]) {
              let textCom = canvas.getByText(element[key]);
              expect(textCom).toBeInTheDocument();
            }
          }
        }
      }
    });
  },
};
