import { Box, BoxProps, Skeleton } from '@mui/material';
import { DetailsHeader } from '../DetailsViews/DetailsContent/DetailsHeader';
import { ForecastMainContent } from './ForecastContent/ForecastMainContent/ForecastMainContent';
export type ForecastSkeltonProps = BoxProps & {
  title: string;
  isDataLoaded: boolean;
  shiftChartData: Array<number>;
};

export const ForecastSkelton = () => {
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
      <ForecastMainContent pageName={''} tankDetails={undefined}></ForecastMainContent>
    </Box>
  );
};
