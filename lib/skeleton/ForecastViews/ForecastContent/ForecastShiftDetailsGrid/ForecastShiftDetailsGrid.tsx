import { Box, BoxProps, Button, Card, Skeleton } from '@mui/material';
import { OdsGridComponent } from 'components/Grid/OdsGridComponent';
import { columnGroupingModel, multiShiftColumnsBase } from '../../../../../src/config/GridColumnDetails';
import dayjs from 'dayjs';
import { ShiftData } from 'models/ShiftData';
import { day1, day2, day3, day4, day5, weeklyResult } from '../../../../../src/stories/assets/StubShiftData';
export type ForecastShiftDetailsProps = BoxProps & {
  shiftData: ShiftData | object;
};

export const ForecastShiftDetailsGrid = (props: ForecastShiftDetailsProps) => {
  const { ...data } = props;

  let today = dayjs();
  return (
    <OdsGridComponent
      gridRows={weeklyResult.shifts}
      gridColumns={multiShiftColumnsBase}
      gridPageSize={7}
      gridPerPageOptions={[5, 10]}
      columnGroupingModel={columnGroupingModel}
      columns={[]}
    ></OdsGridComponent>
  );
};
