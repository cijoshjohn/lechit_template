import { Box, BoxProps, Button, Card, Grid2 as Grid, Skeleton } from '@mui/material';
import { ShiftData } from 'models/ShiftData';
import dayjs from 'dayjs';
import { FeedDetails } from 'components/Feed/FeedDetails';
import { useTheme } from '@mui/material/styles';

export type DetailsMainContentProps = BoxProps & {
  shiftData: ShiftData;
  pageName: string;
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

const withData = (shiftData: ShiftData) => {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ flexGrow: 1, m: theme.spacing(3) }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 2.5, md: 2.5, lg: 2.5, xl: 2.5 }} border={0.5}>
            <FeedDetails shiftData={shiftData} sizePx={0}></FeedDetails>
          </Grid>
          <Grid size={{ xs: 7, md: 7, lg: 7, xl: 7 }} border={0.5}>
            <>dfg</>
          </Grid>
          <Grid size={{ xs: 2.5, md: 2.5, lg: 2.5, xl: 2.5 }} border={0.5}>
            <>dfg</>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export const DetailsMainContent = (props: DetailsMainContentProps) => {
  const { ...data } = props;

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
      {data.shiftData ? withData(data.shiftData) : noData()}
      {/* <Card sx={{ height: '30vh', width: '24%' }}></Card>
      <Card sx={{ height: '70vh', width: '50%' }}></Card>
      <Card sx={{ height: '30vh', width: '24%' }}></Card> */}
    </Box>
  );
};
