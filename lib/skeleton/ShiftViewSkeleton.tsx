import { Box, Skeleton, Paper, BoxProps } from '@mui/material';
import { ShiftOverviewSkeleton } from './ShiftOverviewSkeleton';
import { ShiftChartViewSkeleton } from './ShiftViews/ShiftChartViewSkeleton';
import { ShiftOverviewData } from 'models/ShiftOverviewData';
import { OdsDateNaviation } from 'components/DateNavigation/OdsDateNaviation';
import { useShiftContext } from '../../src/contexts/ShiftContext'; //TODO: need to get the proper way for this path

export type ShiftViewSkeletonProps = BoxProps & {
  title: string;
  isDataLoaded: boolean;
  shiftChartData: Array<number>;
  shiftData: { [key: string]: ShiftOverviewData };
};

export const ShiftViewSkeleton = (props: ShiftViewSkeletonProps) => {
  const { title, isDataLoaded, shiftChartData, shiftData } = props;

  const { currentShiftDate, setCurrentShiftDate, customizedHighlightFields } = useShiftContext();

  const currentDateStr = currentShiftDate.format('YYYY-MM-DD');
  const previousDateStr = currentShiftDate.subtract(1, 'day').format('YYYY-MM-DD');
  const nextDateStr = currentShiftDate.add(1, 'day').format('YYYY-MM-DD');

  const onCurrentShiftDateChange = (newData, updatedDate) => {
    setCurrentShiftDate(updatedDate);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box>
        <b>{title}</b>
      </Box>

      {/*	Shift Chart View */}

      <Paper
        sx={{
          textAlign: 'center',
          border: '2px solid',
          borderColor: 'primary.main',
          flex: 1,
        }}
      >
        {isDataLoaded ? (
          <ShiftChartViewSkeleton chartData={shiftChartData} />
        ) : (
          <Skeleton variant="rectangular" width="100%" height={400} animation="wave" sx={{ height: '100%' }} />
        )}
      </Paper>
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          gap: 1,
        }}
      >
        <OdsDateNaviation
          iconColor="primary"
          isForward={false}
          currentDate={currentShiftDate}
          calculatedDatesCallback={onCurrentShiftDateChange}
        />

        <Paper
          sx={{
            textAlign: 'center',
            flex: 2,
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        >
          {isDataLoaded ? (
            <ShiftOverviewSkeleton
              title="Yesterday"
              isDataLoaded={isDataLoaded}
              shiftOverviewData={shiftData[previousDateStr]}
              customizedHighlightFields={customizedHighlightFields}
            ></ShiftOverviewSkeleton>
          ) : (
            <Skeleton
              variant="rectangular"
              width="100%"
              animation="wave"
              height={400}
              sx={{ height: '100%', flex: 1 }}
            />
          )}
        </Paper>
        <Paper
          sx={{
            textAlign: 'center',
            flex: 2,
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        >
          {isDataLoaded ? (
            <ShiftOverviewSkeleton
              title="Today"
              isDataLoaded={isDataLoaded}
              shiftOverviewData={shiftData[currentDateStr]}
              customizedHighlightFields={customizedHighlightFields}
            ></ShiftOverviewSkeleton>
          ) : (
            <Skeleton
              variant="rectangular"
              width="100%"
              animation="wave"
              height={400}
              sx={{ height: '100%', flex: 1 }}
            />
          )}
        </Paper>
        <Paper
          sx={{
            textAlign: 'center',
            flex: 2,
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        >
          {isDataLoaded ? (
            <ShiftOverviewSkeleton
              title="Tomorrow"
              isDataLoaded={isDataLoaded}
              shiftOverviewData={shiftData[nextDateStr]}
              customizedHighlightFields={customizedHighlightFields}
            ></ShiftOverviewSkeleton>
          ) : (
            <Skeleton
              variant="rectangular"
              width="100%"
              animation="wave"
              height={400}
              sx={{ height: '100%', flex: 1 }}
            />
          )}
        </Paper>

        <OdsDateNaviation
          iconColor="primary"
          isForward={true}
          currentDate={currentShiftDate}
          calculatedDatesCallback={onCurrentShiftDateChange}
        />
      </Box>
    </Box>
  );
};
