/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OdsGraphComponent } from '../../OdsGraphComponent';
import Highcharts from 'highcharts/highcharts.src';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

let defaultGraphOptions = {
  chart: {
    type: 'solidgauge',
    //width: '100%',
    //height: 350,
  },

  title: {
    text: 'Title',
    floating: true,
    align: 'left',
    //x: 20,
    //y: 40,
    style: {
      color: 'white',
      align: 'left',

      //fontWeight: '600',
    },
  },

  pane: {
    center: ['50%', '20%'],
    size: '100%',
    startAngle: -90,
    endAngle: 90,
    background: {
      borderWidth: 0,
      outerRadius: '80%',
      innerRadius: '90%',
      backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
      shape: 'arc',
    },
  },

  tooltip: {
    enabled: false,
  },

  // the value axis
  yAxis: {
    min: 0,
    max: 100,
    lineWidth: 0,
    minorTickInterval: null,
    tickPixelInterval: 400,
    tickWidth: 0,
    tickAmount: 2,
    gridLineWidth: 0,
    gridLineColor: 'transparent',
    labels: {
      align: 'center',
      x: 5,
      y: 20,
      style: {
        color: 'primary',
        fontSize: '',
        useHTML: true,
        format: `<span style="font-family: 'Roboto Mono', monospace;>this.value</span>`,
      },
    },
    title: {
      useHTML: true,
      text: '',
    },
  },

  series: [
    {
      name: 'gaugevalue',
      data: [
        {
          color: 'background.gaugevalues',
          radius: '70%',
          innerRadius: '100%',
          y: 50,
          borderWidth: 0,
        },
      ],
      dataLabels: {
        useHTML: true,
        format: '<span style="font-size: 7em;  display:inline;font-weight: bold">{point.y}</span>',
        align: 'center',
        verticalAlign: 'top',
        borderWidth: 0,
        style: {
          textAlign: 'center',
        },
      },
    },
  ],
  caption: {
    useHTML: true,
    text: '<b>Performance Indicator</b>', // Your footer heading
    align: 'center',
    style: {
      fontSize: '20px',
      color: 'primary.main',
    },

    verticalAlign: 'bottom', // Align to the bottom
    y: -100, // Adjust vertical position as needed
  },
};

export type OdsSingleGaugeGraphComponentProps = {
  gaugevalue: number;
  title: string;
  titlePosition: string;
  footerTitle: string;
  unit: string;
  mainColor: string;
  maxValue: number;
};

export function OdsSingleGauge(props: OdsSingleGaugeGraphComponentProps): JSX.Element {
  const { gaugevalue, title, titlePosition, footerTitle, unit, mainColor, maxValue, ...derivedProps } = props;
  const [newTitle] = useState(title);

  useEffect(() => {}, [gaugevalue, title, maxValue, titlePosition]);
  const theme = useTheme();
  let baseSingleGaugeConfig = JSON.parse(JSON.stringify(defaultGraphOptions));
  baseSingleGaugeConfig.series[0].data[0].y = Number(gaugevalue);
  baseSingleGaugeConfig.series[0].data[0].color = theme.palette.background['actuals'];
  baseSingleGaugeConfig.yAxis.min = 0;
  baseSingleGaugeConfig.yAxis.max = maxValue;
  baseSingleGaugeConfig.title.text = newTitle;
  const rawFontSize = theme.typography.h3.fontSize;
  const baseFontSize = typeof rawFontSize === 'string' ? parseFloat(rawFontSize) : rawFontSize;
  baseSingleGaugeConfig.title.style.fontSize = `${baseFontSize + 0.5}rem`;
  baseSingleGaugeConfig.title.style['fontFamily'] = theme.typography.h3.fontFamily;
  baseSingleGaugeConfig.title.style['fontWeight'] = theme.typography.h3.fontWeight;

  baseSingleGaugeConfig.caption.text = footerTitle;

  baseSingleGaugeConfig.pane.background.backgroundColor = theme.palette.grey[500];
  // baseSingleGaugeConfig.title.style.fontWeight = 400;

  baseSingleGaugeConfig.title.verticalAlign = titlePosition;
  let unitColor = theme.palette.text.primary;
  baseSingleGaugeConfig.series[0].dataLabels.format =
    '<span class="mono-text" style="font-size: ' +
    theme.typography.h5.fontSize +
    '; display:inline; font-weight: ' +
    theme.typography.h5.fontWeight +
    '; color: ' +
    theme.palette.text.primary +
    ';">{point.y} ' +
    (unit ?? '') +
    '</span>';

  baseSingleGaugeConfig.series[0]['dataLabels']['y'] = -80;

  if (derivedProps?.sx?.height) {
    baseSingleGaugeConfig.chart['height'] = derivedProps.sx.height;
  }
  if (derivedProps?.sx?.width) {
    baseSingleGaugeConfig.chart['width'] = derivedProps.sx.width;
  }

  baseSingleGaugeConfig.yAxis.title['y'] = titlePosition === 'bottom' ? 90 : -10;
  baseSingleGaugeConfig.pane.center[1] = titlePosition === 'bottom' ? '5%' : '70%';

  baseSingleGaugeConfig.yAxis.labels.style.fontSize = theme.typography.h5.fontSize;
  baseSingleGaugeConfig.yAxis.labels.style.color = theme.palette.text.primary;

  return (
    <>
      <OdsGraphComponent
        chartOptions={baseSingleGaugeConfig}
        isImmutable={false}
        allowChartUpdate={false}
        {...derivedProps}
      />
    </>
  );
}

export default OdsSingleGauge;
