import { Box, BoxProps, Skeleton } from '@mui/material';
import { DetailsHeader } from './DetailsViews/DetailsHeader';
import { DetailsFilter } from './DetailsViews/DetailsFilter';
import { DetailsMainContent } from './DetailsViews/DetailsMainContent';
import { day1 } from '../../src/stories/assets/StubShiftData';
export type DetailSkeltonProps = BoxProps & {
  title: string;
  isDataLoaded: boolean;
  shiftChartData: Array<number>;
};

export const DetailSkelton = () => {
  //let { title, isDataLoaded, shiftChartData } = props;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
        height: 175,
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
          height: 175,
        }}
      >
        <DetailsHeader pageName={''} highlightData={[]}></DetailsHeader>
      </Box>
      {/* <DetailsFilter></DetailsFilter> */}
      {/* replace this */}
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ width: '100%', minHeight: 70 }}
        data-testid="page-highlight-loading1"
      />
      <DetailsMainContent pageName={'Detild'} tankDetails={undefined} shiftData={day1}></DetailsMainContent>
    </Box>
  );
};
