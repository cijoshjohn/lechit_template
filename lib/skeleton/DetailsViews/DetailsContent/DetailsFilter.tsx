/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Button, Card, CardProps, Stack } from '@mui/material';
import { OdsDateOption } from 'components/DateOption/OdsDateOption';
import RefreshIcon from '@mui/icons-material/Refresh';
import dayjs from 'dayjs';
import { Banner } from 'components/Banner/Banner';
import { useState } from 'react';
import { ShiftData } from 'models/ShiftData';
import { useNavigate } from 'react-router-dom';

export type DetailsFilterProps = CardProps & {
  shiftData: ShiftData | object;
  onForecastShow: (isForecast: boolean) => void;
};

const handleShiftViewAdjust = () => {};

export const DetailsFilter = (props: DetailsFilterProps) => {
  const { ...data } = props;

  const [currentShiftData] = useState(data.shiftData);
  const [isForecast, setIsForecast] = useState(true);

  const handleForecastAdjust = () => {
    setIsForecast(!isForecast);
    data.onForecastShow(!isForecast);
  };

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
            cnUsed={currentShiftData.summary ? currentShiftData.summary.cnUsed : currentShiftData.cnUsed}
            cnConcTailing={
              currentShiftData.summary ? currentShiftData.summary.cnConcTailing : currentShiftData.cnConcTailing
            }
            leachingProfile_recovered_au={
              currentShiftData.summary ? currentShiftData.summary.auRecovered : currentShiftData.auRecovered
            }
            leachingProfile_recoverable_au={
              currentShiftData.summary ? currentShiftData.summary.auProduced : currentShiftData.auProduced
            }
            cnAdded={currentShiftData.summary ? currentShiftData.summary.cnAdded : currentShiftData.cnAdded}
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
