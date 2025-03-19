import { Box, Button, Card } from '@mui/material';
import { OdsDateOption } from 'components/DateOption/OdsDateOption';
import RefreshIcon from '@mui/icons-material/Refresh';
import dayjs from 'dayjs';

const handleForecastAdjust = () => {};

const handleShiftViewAdjust = () => {};

export const DetailsFilter = () => {
  let today = dayjs();
  return (
    <Card sx={{ m: 1, p: 1, width: '100%', minHeight: 70 }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: 'primary.main',
          m: 0.5,
        }}
      >
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
