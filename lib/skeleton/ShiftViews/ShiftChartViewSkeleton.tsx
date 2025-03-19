import { Box, BoxProps } from '@mui/material';
import { OdsGraphComponent } from 'components/GraphComponent/OdsGraphComponent';

export type ShiftChartViewSkeletonProps = BoxProps & {
  chartData: Array<number>;
};

export const ShiftChartViewSkeleton = (props: ShiftChartViewSkeletonProps) => {
  const { chartData } = props;

  let forecastSample = chartData.map((element) => element + 1);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      backgroundColor: null,
    },
    title: {
      text: 'Forecast vs Actual',
    },
    series: [
      {
        name: 'Actual',
        data: chartData,
      },
      {
        name: 'Forecast',
        data: forecastSample,
      },
    ],
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '50%' }}>
      {/* Select Option */}

      {/* Chart */}
      <OdsGraphComponent chartOptions={chartOptions} isImmutable={true} allowChartUpdate={false} />
    </Box>
  );
};
