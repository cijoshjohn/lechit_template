import { Box, BoxProps, Skeleton } from '@mui/material';
import { DetailsHeader } from './DetailsContent/DetailsHeader';
import { DetailsFilter } from './DetailsContent/DetailsFilter';
import { DetailsCenterContent } from './DetailsContent/DetailsCenterContent';
//import { day1, weeklyResult } from '../../../src/stories/assets/StubShiftData';
import { day1 } from '../../../src/stories/NewStubshiftData';
import { useState } from 'react';
import { ForecastSkelton } from 'skeleton/ForecastViews/ForecastSkelton';
export type DetailSkeltonProps = BoxProps & {
  title: string;
  isDataLoaded: boolean;
  shiftChartData: Array<number>;
};

export const DetailSkelton = () => {
  //let { title, isDataLoaded, shiftChartData } = props;
  const [isForecast, setIsForecast] = useState(false);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        height: 175,
      }}
    >
      <DetailsFilter
        shiftData={day1}
        onForecastShow={function (isForecast: boolean): void {
          setIsForecast(isForecast);
        }}
      ></DetailsFilter>
      {/* replace this */}
      {/* <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ width: '100%', minHeight: 70 }}
        data-testid="page-highlight-loading1"
      /> */}
      {isForecast ? (
        <>
          <ForecastSkelton />
        </>
      ) : (
        <DetailsCenterContent pageName={'Detild'} tankDetails={undefined} shiftData={day1}></DetailsCenterContent>
      )}
    </Box>
  );
};
