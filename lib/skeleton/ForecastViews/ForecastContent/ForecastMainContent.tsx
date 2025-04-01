import { Box, BoxProps, Button, Card, Skeleton } from '@mui/material';

import dayjs from 'dayjs';

export type ForecastMainContentProps = BoxProps & {
  pageName: string;
  tankDetails: object;
};

const noData = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ height: '30vh', width: '24%' }}
        data-testid="page-highlight-loading1"
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ height: '70vh', width: '50%' }}
        data-testid="page-highlight-loading1"
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ height: '30vh', width: '24%' }}
        data-testid="page-highlight-loading1"
      />
    </>
  );
};

const withData = () => {
  return (
    <>
      <Card sx={{ height: '70vh', width: '25%' }}>
        {/* replace this */}
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ height: '100%', width: '100%' }}
          data-testid="page-highlight-loading1"
        />
      </Card>
      <Card sx={{ height: '70vh', width: '73%' }}>
        {/* replace this */}
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ height: '100%', width: '100%' }}
          data-testid="page-highlight-loading1"
        />
      </Card>
    </>
  );
};

export const ForecastMainContent = (props: ForecastMainContentProps) => {
  const { ...headerDetails } = props;

  let today = dayjs();
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
      sx={{ gap: 2 }}
    >
      {withData()}
      {/* {headerDetails.tankDetails ? withData() : noData()} */}
      {/* <Card sx={{ height: '30vh', width: '24%' }}></Card>
      <Card sx={{ height: '70vh', width: '50%' }}></Card>
      <Card sx={{ height: '30vh', width: '24%' }}></Card> */}
    </Box>
  );
};
