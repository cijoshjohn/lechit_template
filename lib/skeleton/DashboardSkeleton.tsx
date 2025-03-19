import { Box, BoxProps } from '@mui/material';
import { ShiftViewSkeleton } from './ShiftViewSkeleton';
import { ShiftOverviewData } from 'models/ShiftOverviewData';

export type DashboardSkeletonProps = BoxProps & {
  title: string;
  isDataLoaded: boolean;
  shiftChartData: Array<number>;
  shiftData: { [key: string]: ShiftOverviewData };
};

export const DashboardSkeleton = (props: DashboardSkeletonProps) => {
  let { title, isDataLoaded, shiftChartData, shiftData } = props;

  return (
    <Box sx={{ width: '100%', flexDirection: 'column', height: '100vh', mt: 2 }}>
      {/* Header View – App Bar */}
      {/* <Skeleton variant="rectangular" width="100%" height={50} animation="wave" /> */}

      {/* Shift View */}
      {/* <Skeleton variant="rectangular" sx={{ mt: 1, flex: 1, width: "auto", height: "auto", padding: 2, border: '10px solid', borderColor: 'primary.main' }} animation="wave" /> */}
      <ShiftViewSkeleton
        title={title}
        isDataLoaded={isDataLoaded}
        shiftChartData={shiftChartData}
        shiftData={shiftData}
      />
    </Box>
  );
};
