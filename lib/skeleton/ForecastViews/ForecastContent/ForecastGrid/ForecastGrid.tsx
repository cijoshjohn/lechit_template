import { Box, BoxProps, Button, Card, Skeleton } from '@mui/material';
import { OdsGridComponent } from 'components/Grid/OdsGridComponent';
import {
  simulationSingleColumns,
  simulationMultiShifColumns,
  columnGroupingModelBase,
} from '../../../../../src/config/GridColumnDetails';
import dayjs from 'dayjs';
import { ShiftData } from 'models/ShiftData';
import { day1, day2, day3, day4, day5, weeklyResult } from '../../../../../src/stories/assets/StubShiftData';
export type ForecastMainContentProps = BoxProps & {
  shiftData: ShiftData | object;
};

export const ForecastGrid = (props: ForecastMainContentProps) => {
  const { ...data } = props;

  let currnetShiftData = data.shiftData ? data.shiftData : {};

  let today = dayjs();
  return (
    <>
      {
        /* currnetShiftData['summary']  */ 1 ? (
          <OdsGridComponent
            gridRows={[day1]}
            gridColumns={simulationMultiShifColumns}
            gridPageSize={0}
            gridPerPageOptions={[]}
            columnGroupingModel={[]}
            columns={[]}
          />
        ) : (
          <OdsGridComponent
            gridRows={[day1]}
            gridColumns={simulationSingleColumns}
            gridPageSize={0}
            gridPerPageOptions={[]}
            columnGroupingModel={[]}
            columns={[]}
          />
        )
      }
    </>
  );
};
