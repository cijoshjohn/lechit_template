/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OdsGraphComponent } from '../OdsGraphComponent';
import Highcharts from 'highcharts/highcharts.src';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';

let defaultGraphOptions = {
  chart: {
    type: 'solidgauge',

    height: null,
    width: null,
  },

  title: {
    text: null,
    style: {
      color: 'primary.main',
    },
  },

  pane: {
    center: ['50%', '50%'],
    size: '100%',
    startAngle: -90,
    endAngle: 90,
    background: [
      {
        outerRadius: '90%',
        innerRadius: '100%',
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
        shape: 'arc',
      },
      {
        outerRadius: '80%',
        innerRadius: '90%',
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[4]).setOpacity(0.3).get(),
        shape: 'arc',
      },
    ],
  },

  /* tooltip: {
    enabled: false,
  }, */

  // the value axis
  yAxis: {
    min: 0,
    max: 100,
    /* stops: [
      [0.1, '#e74c3c'], // red
      [0.5, '#f1c40f'], // yellow
      [0.5, '#2ecc71'], // green
    ], */
    minorTickInterval: null,
    tickPixelInterval: 400,
    tickWidth: 0,
    gridLineWidth: 0,
    gridLineColor: 'transparent',
    labels: {
      enabled: false,
    },
    title: {
      useHTML: true,
      text: '',
    },
  },

  tooltip: {
    borderWidth: 0,
    backgroundColor: 'none',
    shadow: false,
    style: {
      fontSize: '10px',
    },

    pointFormat:
      '{series.name}<br>' +
      '<span style="font-size: 2em; color: {point.color}; ' +
      'font-weight: bold">{point.y}</span>',
    positioner: function (labelWidth) {
      return {
        x: (this.chart.chartWidth - labelWidth) / 2,
        y: this.chart.plotHeight / 2 + 15,
      };
    },
  },

  series: [
    {
      name: 'Actual',
      data: [
        {
          color: 'background.actuals',
          radius: '90%',
          innerRadius: '100%',
          y: 0,
        },
      ],
      dataLabels: { enabled: false },
    },
    {
      name: 'Forecast',
      data: [
        {
          color: 'background.forecast',
          radius: '80%',
          innerRadius: '90%',
          y: 0,
        },
      ],
      dataLabels: { enabled: false },
    },
  ],
};

export type OdsDoubleGaugeGraphComponentProps = {
  actual: number;
  forecast: number;
  title: string;
  titlePosition: string;
  maxValue: number;
};

export function OdsDoubleGaugeChart(props: OdsDoubleGaugeGraphComponentProps): JSX.Element {
  const { actual, forecast, title, titlePosition, maxValue, ...derivedProps } = props;

  /*   const [newActual] = useState<number>(actual);
  const [newForecast] = useState<number>(forecast);
  const [newTitle] = useState<string>(title);
  const [newMaxValue] = useState<number>(maxValue); */

  useEffect(() => {}, [actual, forecast, title, maxValue]);
  const theme = useTheme();
  let baseDoubleGaugeConfig = defaultGraphOptions;
  baseDoubleGaugeConfig.series[0].data[0].y = actual;
  baseDoubleGaugeConfig.series[0].data[0].color = theme.palette.background['actual'];
  baseDoubleGaugeConfig.series[1].data[0].color = theme.palette.background['forecast'];
  baseDoubleGaugeConfig.series[1].data[0].y = forecast;
  baseDoubleGaugeConfig.yAxis.max = maxValue ?? actual + forecast;
  baseDoubleGaugeConfig.title.text = title;
  if (derivedProps?.sx?.height) {
    baseDoubleGaugeConfig.chart['height'] = derivedProps.sx.height;
  }
  if (derivedProps?.sx?.width) {
    baseDoubleGaugeConfig.chart['width'] = derivedProps.sx.width;
  }

  baseDoubleGaugeConfig.yAxis.title['y'] = titlePosition === 'bottom' ? 10 : -60;
  baseDoubleGaugeConfig.pane.center[1] = titlePosition === 'bottom' ? '70%' : '90%';

  return (
    <>
      <OdsGraphComponent
        chartOptions={baseDoubleGaugeConfig}
        isImmutable={false}
        allowChartUpdate={false}
        {...derivedProps}
      />
    </>
  );
}

export default OdsDoubleGaugeChart;
