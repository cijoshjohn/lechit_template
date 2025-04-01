import { useTheme } from '@mui/material';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src.js';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from 'react';

import 'highcharts/es-modules/masters/highcharts-more.src.js';
import 'highcharts/es-modules/masters/modules/solid-gauge.src.js';

export type OdsGraphComponentProps = {
  chartOptions: Highcharts.Options;
  isImmutable: boolean;
  allowChartUpdate: boolean;
};

/**
 * A menu item for switching the active color mode (system, light, dark).
 */
export function OdsGraphComponent(props: OdsGraphComponentProps): JSX.Element {
  const { chartOptions, isImmutable, allowChartUpdate } = props;

  const theme = useTheme();
  useEffect(() => {
    // Update chart background and text color
    if (!chartOptions.chart) chartOptions.chart = {};
    chartOptions.chart.backgroundColor = 'transparent';
    if (!chartOptions.chart.style) chartOptions.chart.style = {};
    chartOptions.chart.style.color = theme.palette.text.primary;

    // Update title color
    if (!chartOptions.title) chartOptions.title = {};
    if (!chartOptions.title.style) chartOptions.title.style = {};
    chartOptions.title.style.color = theme.palette.text.primary;

    // Update xAxis properties
    if (!chartOptions.xAxis) chartOptions.xAxis = {};
    if (!chartOptions.xAxis.labels) chartOptions.xAxis.labels = {};
    if (!chartOptions.xAxis.labels.style) chartOptions.xAxis.labels.style = {};
    chartOptions.xAxis.labels.style.color = theme.palette.text.secondary;
    const isDark = theme.palette.mode === 'dark';
    if (!chartOptions.xAxis.gridLineColor) chartOptions.xAxis.gridLineColor = {};
    chartOptions.xAxis.gridLineColor = isDark ? '#ffffff' : '#e6e6e6';
    if (!chartOptions.xAxis.lineColor) chartOptions.xAxis.lineColor = {};
    chartOptions.xAxis.lineColor = isDark ? '#ffffff' : '#e6e6e6';
    if (!chartOptions.xAxis.tickColor) chartOptions.xAxis.tickColor = {};
    chartOptions.xAxis.tickColor = isDark ? '#ffffff' : '#e6e6e6';

    // Update yAxis properties
    if (!chartOptions.yAxis) chartOptions.yAxis = {};
    if (!chartOptions.yAxis.labels) chartOptions.yAxis.labels = {};
    if (!chartOptions.yAxis.labels.style) chartOptions.yAxis.labels.style = {};
    chartOptions.yAxis.labels.style.color = theme.palette.text.secondary;
    chartOptions.yAxis.gridLineColor = isDark ? '#ffffff' : '#e6e6e6';
    chartOptions.yAxis.lineColor = isDark ? '#ffffff' : '#e6e6e6';
    chartOptions.yAxis.tickColor = isDark ? '#ffffff' : '#e6e6e6';
    if (!chartOptions.yAxis.title) chartOptions.yAxis.title = {};
    if (!chartOptions.yAxis.title.style) chartOptions.yAxis.title.style = {};
    chartOptions.yAxis.title.style.color = theme.palette.text.primary;

    // Update tooltip style
    if (!chartOptions.tooltip) chartOptions.tooltip = {};
    if (!chartOptions.tooltip.style) chartOptions.tooltip.style = {};
    chartOptions.tooltip.style.color = theme.palette.text.primary;

    // Update legend style
    if (!chartOptions.legend) chartOptions.legend = {};
    if (!chartOptions.legend.itemStyle) chartOptions.legend.itemStyle = {};
    chartOptions.legend.itemStyle.color = theme.palette.text.primary;
    if (!chartOptions.legend.itemHoverStyle) chartOptions.legend.itemHoverStyle = {};
    chartOptions.legend.itemHoverStyle.color = theme.palette.text.primary;

    // Update series and marker colors
    if (!chartOptions.plotOptions) chartOptions.plotOptions = {};
    if (!chartOptions.plotOptions.series) chartOptions.plotOptions.series = {};
    chartOptions.plotOptions.series.color = theme.palette.primary.main;
    if (!chartOptions.plotOptions.series.marker) chartOptions.plotOptions.series.marker = {};
    chartOptions.plotOptions.series.marker.fillColor = theme.palette.primary.main;
    chartOptions.plotOptions.series.marker.lineColor = theme.palette.background.paper;
    chartOptions['credits'] = {};
    chartOptions.credits['enabled'] = false;
  }, [theme]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      immutable={isImmutable}
      allowChartUpdate={allowChartUpdate}
    />
  );
}
