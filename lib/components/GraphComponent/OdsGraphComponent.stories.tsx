import type { Meta, StoryObj } from '@storybook/react';
import { OdsGraphComponent } from './OdsGraphComponent';
import { expect, userEvent, within } from '@storybook/test';
import { HighchartsReactProps } from 'highcharts-react-official';
import { render } from '@testing-library/react';

const PieChart: Highcharts.Options = {
  chart: {
    type: 'pie',
    plotShadow: false,
  },
  title: {
    text: 'Pie chart',
    align: 'left',
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  accessibility: {
    point: {
      valueSuffix: '%',
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      },
    },
  },
  series: [
    {
      type: 'pie', // Add the 'type' property here
      name: 'Brands',

      data: [
        { name: 'Chrome', y: 61.41 },
        { name: 'Internet Explorer', y: 11.84 },
        { name: 'Firefox', y: 10.85 },
        { name: 'Edge', y: 4.67 },
        { name: 'Safari', y: 4.18 },
        { name: 'Others', y: 7.05 },
      ],
    },
  ],
};

const LineChart: Highcharts.Options = {
  chart: {
    type: 'line',
  },
  title: {
    text: 'Simple Line Chart',
  },
  series: [
    {
      data: [1, 2, 3, 4, 5],
    },
  ],
};

const temp: HighchartsReactProps = {
  chartOptions: PieChart,
};

const meta = {
  title: 'component/OdsGraphComponent',
  component: OdsGraphComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: temp,
} satisfies Meta<typeof OdsGraphComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const piechart = canvas.getByText('Pie chart');
    await expect(piechart).toBeInTheDocument();
  },
};

export const CheckLineChart: Story = {
  args: {
    chartOptions: LineChart,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const piechart = canvas.getByText('Simple Line Chart');
    await expect(piechart).toBeInTheDocument();
  },
};
// const sampleLineChart: Highcharts.Options = {
//   chart: {
//     type: 'line',
//   },
//   title: {
//     text: 'New Line Chart',
//   },
//   series: [
//     {
//       data: [1, 2, 3],
//     },
//   ],
// };

/* export const ChartUpdate: Story = {
  args: {
    chartOptions: PieChart,
    isImmutable: false,
    allowChartUpdate: true,
  },

  play: async ({ canvasElement }) => {
    const { rerender } = render(
      <OdsGraphComponent chartOptions={sampleLineChart} isImmutable={false} allowChartUpdate={false} />,
    );
    const canvas = within(canvasElement);

    await new Promise((resolve) => setTimeout(resolve, 600));

    rerender(<OdsGraphComponent chartOptions={LineChart} isImmutable={false} allowChartUpdate={false} />);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const piechart = canvas.getByText('New Line Chart');
    await expect(piechart).toBeInTheDocument();
  },
}; */

const scatterChart: Highcharts.Options = {
  chart: {
    type: 'scatter',
  },
  title: {
    text: 'Simple Scatter Chart',
  },
  xAxis: {
    title: {
      enabled: true,
      text: 'X-Axis Label',
    },
  },
  yAxis: {
    title: {
      enabled: true,
      text: 'Y-Axis Label',
    },
  },
  series: [
    {
      name: 'Data Series',
      data: [
        [1, 2],
        [2, 4],
        [3, 6],
        // Add more data points here
      ],
    },
  ],
};

export const CheckScatter: Story = {
  args: {
    chartOptions: scatterChart,
    isImmutable: false,
    allowChartUpdate: true,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const piechart = canvas.getByText('Simple Scatter Chart');
    await expect(piechart).toBeInTheDocument();
  },
};
