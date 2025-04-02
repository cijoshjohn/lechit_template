import { Box, Button, Card, Stack } from '@mui/material';
import { OdsDateOption } from 'components/DateOption/OdsDateOption';
import RefreshIcon from '@mui/icons-material/Refresh';
import dayjs from 'dayjs';
import { Banner } from 'components/Banner/Banner';

const handleForecastAdjust = () => {};

const handleShiftViewAdjust = () => {};

export const DetailsFilter = () => {
  let today = dayjs();
  return (
    <Card sx={{ m: 1, p: 1, width: '100%', minHeight: 225 }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: 'primary.main',
          backgroundColor: 'transparent',
          m: 0.5,
        }}
      >
        <Stack direction="column" alignItems={'flex-end'} m={2} sx={{ backgroundColor: 'transparent' }}>
          <OdsDateOption
            align={''}
            currentStartDate={today}
            fixedDateRange={''}
            minLimit={null}
            maxLimit={null}
            showFixedDateSelection={false}
            showSelectedDateLabel={false}
            showDateRangeNavigation={false}
            endDate={null}
          ></OdsDateOption>
        </Stack>

        <Stack direction="column" alignItems={'flex-end'} m={2}>
          <Button
            variant="contained"
            onClick={handleForecastAdjust}
            color="primary"
            size="small"
            sx={{ fontSize: 'large', width: '30%' }}
          >
            <RefreshIcon />
            Adjust Forecast
          </Button>
          <Banner
            cumulativeResidenceTime={5456.7}
            cyanideProfile_model_cn={455.8}
            leachingProfile_recovered_au={56.8}
            leachingProfile_recoverable_au={67.7}
            cnAdded={34.8}
          ></Banner>
        </Stack>

        {/*  <Button variant="contained" onClick={handleShiftViewAdjust}>
          Shift View
        </Button>
        <Button variant="contained" onClick={handleForecastAdjust}>
          <RefreshIcon />
          Adjust Forecast
        </Button> */}
      </Box>
    </Card>
  );
};
