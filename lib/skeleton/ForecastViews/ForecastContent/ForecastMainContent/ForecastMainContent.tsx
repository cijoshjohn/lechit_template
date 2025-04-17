/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-for-in-array */
import {
  Box,
  BoxProps,
  Button,
  Grid2 as Grid,
  Stack,
  Typography,
  Paper,
  useTheme,
  styled,
  Divider,
  Toolbar,
  AppBar,
  FormControlLabel,
  Switch,
  TextField,
  Slider,
} from '@mui/material';
import { feedproperties, mainProps } from '../../../../../src/config/config';
import { day1 } from '../../../../../src/stories/assets/StubShiftData';
import dayjs from 'dayjs';
import { ForecastGrid } from '../ForecastGrid/ForecastGrid';
import { ForecastShiftDetailsGrid } from '../ForecastShiftDetailsGrid/ForecastShiftDetailsGrid';
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { MultishiftSlider } from 'components/MultishiftSlider/MultishiftSlider';

export type ForecastMainContentProps = BoxProps & {
  pageName: string;
  tankDetails: object;
  feedData: Array<object>;
};

const setBaseline = () => {};

interface mainDetailsValues {
  mainHeading: string;
  details: Array<object>;
}

export const ForecastMainContent = (props: ForecastMainContentProps) => {
  const { ...data } = props;
  let sliderDefaultValues = {};
  let newConvertedFeedData = {};

  //need to be dynamic
  for (const key in props.feedData || day1) {
    if (Object.hasOwnProperty.call(day1, key)) {
      sliderDefaultValues[key] = [0, 0];
    }
  }
  const { ...headerDetails } = props;
  const [value, setValue] = useState(0);
  const [forecastType, setForecastType] = useState(false);
  const [originaltSliderFeedData] = useState(sliderDefaultValues);
  const [currentSliderFeedData, setCurrentSliderFeedData] = useState(props.feedData || day1); //need to be dynamic
  const [mainValues] = useState(mainProps);
  const [currentFeedData, setCurrentFeedData] = useState(props.feedData || day1); //need to be dynamic

  const handleTypeChange = () => {
    if (forecastType == true) {
      setForecastType(false);
    } else {
      setForecastType(true);
    }
    newConvertedFeedData = {};
  };

  const convertDigits = (data) => {
    let converted = Number(data).toLocaleString(navigator.languages, { minimumFractionDigits: 2 });
    if (converted == 'NaN') {
      return data;
    } else {
      return converted;
    }
  };

  const onResetTrigger = () => {};
  const onSimulateTrigger = () => {};

  const handleDefaultChange = () => {};

  const setSliderPropertyValue = (propertyName, newValArray) => {
    let data = newConvertedFeedData;
    data[propertyName] = newValArray;
    newConvertedFeedData = data;
  };

  const handleSliderChange = (event) => {
    let data = currentSliderFeedData;
    if (event.target.value[0] != '' || event.target.value[1] != '') {
      data[event.target.name] = event.target.value[1] || event.target.value[0];
      newConvertedFeedData[event.target.name] = [data[event.target.name], data[event.target.name]];
    }
    setCurrentSliderFeedData(data);
  };

  const StyledStack = styled(Stack)(() => ({
    display: 'flex',
    gap: theme.spacing(1),
    width: '100%',
  }));
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const MainData = (data: mainDetailsValues) => {
    return (
      <StyledStack
        flexDirection="column"
        justifyContent="space-evenly"
        padding={theme.spacing(2)}
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <StyledStack flexDirection="row" justifyContent="space-between" mx={0} />

        <StyledStack flexDirection="row" justifyContent="space-evenly" gap={2}>
          {data.details.map((element, index) => (
            <React.Fragment key={element.name}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6" color="grey.600" noWrap>
                  {element.name}
                </Typography>
                <Typography variant="h5" noWrap className="mono-label">
                  {element.value} {element.unit}
                </Typography>
              </Box>

              {/* Insert divider BETWEEN items, not after the last one */}
              {index < data.details.length - 1 && (
                <Divider orientation="vertical" flexItem sx={{ opacity: 1, borderRightWidth: 4 }} />
              )}
            </React.Fragment>
          ))}
        </StyledStack>
      </StyledStack>
    );
  };

  const MainHighlightData = () => {
    let goldDetails: mainDetailsValues = {
      details: [
        {
          name: 'Gold Recovered',
          value: Number(43).toLocaleString(navigator.languages, {
            minimumFractionDigits: 2,
          }),
          unit: 'g/h',
        },
        {
          name: 'Gold Recovery',
          value: Number(45).toLocaleString(navigator.languages, {
            minimumFractionDigits: 2,
          }),
          unit: '%',
        },
      ],
      mainHeading: 'Gold',
    };

    let cyanideDetails: mainDetailsValues = {
      details: [
        {
          name: 'CN Added ',
          value: Number(4).toLocaleString(navigator.languages, {
            minimumFractionDigits: 2,
          }),
          unit: 'kg/t',
        },
        {
          name: 'CN Used ',
          value: Number(56).toLocaleString(navigator.languages, {
            minimumFractionDigits: 2,
          }),
          unit: 'kg/h',
        },
        {
          name: 'Tailings CN',
          value: Number(56).toLocaleString(navigator.languages, {
            minimumFractionDigits: 2,
          }),
          unit: 'ppm',
        },
      ],
      mainHeading: 'Cyanide',
    };
    let totalDetails: mainDetailsValues = {
      details: [
        {
          name: 'Total Value ',
          value: Number(4).toLocaleString(navigator.languages, {
            minimumFractionDigits: 2,
          }),
          unit: '$/h',
        },
      ],
      mainHeading: 'total',
    };
    return (
      <>
        <Grid container spacing={1} m={1}>
          <Grid size={{ xs: 3, md: 3, lg: 3, xl: 3 }}>
            <Paper sx={{}}>{MainData(totalDetails)}</Paper>
          </Grid>
          <Grid size={{ xs: 5, md: 5, lg: 5, xl: 5 }}>{<Paper>{MainData(goldDetails)}</Paper>}</Grid>
          <Grid size={{ xs: 4, md: 4, lg: 4, xl: 4 }}>
            <Paper sx={{ minWidth: 525 }}>{MainData(cyanideDetails)}</Paper>
          </Grid>
        </Grid>
      </>
    );
  };

  const TabSection = () => {
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
          <Tab label="Simulation" />
          <Tab label="Shift Details" />
        </Tabs>
      </Box>
    );
  };

  const AbsoluteFeedFormInputs = () => {
    return (
      <Box component="div" sx={{ p: 2, oveflow: 'hidden' }}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
          wrap="nowrap"
          overflow="auto"
          data-testid="forecast-feed-form"
        >
          <Grid key="multiForecastSelector">
            <ForecastTypePicker></ForecastTypePicker>
          </Grid>

          {feedproperties.map((property) => (
            <Grid
              key={'multiForecast-' + property.key}
              data-testid={'multiForecast-' + property.key}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid container>
                <Grid size={6}>
                  <Typography variant="h6">
                    <Box>{property.value}</Box>
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <TextField
                    placeholder={mainValues[property.key]}
                    id={property.key}
                    defaultValue={convertDigits(currentFeedData[property.key])}
                    type="number"
                    sx={{ width: 180 }}
                    onChange={handleDefaultChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const RelativeFeedInputForm = () => {
    return (
      <Box component="div" sx={{ p: 1, oveflow: 'hidden' }}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          padding={0}
          wrap="nowrap"
          overflow="auto"
          data-testid="forecast-feed-form"
          //sx={{ height: '80vh' }}
        >
          <Grid key="multiForecastSelector">
            <ForecastTypePicker></ForecastTypePicker>
          </Grid>

          {feedproperties.map((property) => (
            <Grid key={'multiForecast-' + property.key} data-testid={'multiForecast-' + property.key}>
              <Grid container direction={'row'} justifyContent="space-between" alignItems="center" spacing={4} p={1}>
                <Grid size={6}>
                  <Typography variant="h6" noWrap sx={{ textAlign: 'right', paddingRight: 0.5 }}>
                    {property.value}
                  </Typography>
                </Grid>

                <Grid size={6} sx={{ justifyItems: 'flex-start' }}>
                  <MultishiftSlider
                    sliderVal={originaltSliderFeedData[property.key]}
                    propertyName={property.key}
                    setSliderPropertyValue={setSliderPropertyValue}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  let ForecastTypePicker = () => {
    return (
      <FormControlLabel
        control={<Switch checked={forecastType} onChange={handleTypeChange} />}
        labelPlacement="start"
        label={
          <Box sx={{ position: 'relative' }}>
            <Typography variant="h6" component="span" sx={{ position: 'absolute', left: '-90px', top: '-20px' }}>
              Absolute
            </Typography>
            <Typography variant="h6" component="span" sx={{ position: 'absolute', right: '-140px', top: '-20px' }}>
              Relative
            </Typography>
          </Box>
        }
      />
    );
  };

  const FeedForm = () => {
    return (
      <>
        <Box sx={{ flexGrow: 1, boxShadow: 1 }} data-testid="forecast-feed-form-div">
          <AppBar position="static" sx={{ backgroundColor: 'background.paper' }}>
            <Toolbar>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
                FEED
              </Typography>
            </Toolbar>
          </AppBar>

          {forecastType ? <RelativeFeedInputForm /> : <AbsoluteFeedFormInputs />}

          <Grid container direction="row" justifyContent="space-around" alignItems="center" padding={2}>
            <Grid key="resetBtn" data-testid="resetBtn">
              <Button
                variant="outlined"
                onClick={onResetTrigger}
                sx={{ borderColor: 'background.actuals', color: 'background.actuals' }}
              >
                Reset
              </Button>
            </Grid>

            <Grid key="submitBtn" data-testid="submitBtn">
              <Button
                variant="contained"
                onClick={onSimulateTrigger}
                sx={{
                  backgroundColor: 'background.actuals',
                  color: theme.palette.getContrastText(theme.palette.text.primary),
                }}
              >
                Simulate
              </Button>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  };

  const withData = () => {
    return (
      <>
        <Grid
          container
          spacing={1}
          direction="row"
          sx={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexGrow: 1,
            height: '70vh',
          }}
        >
          <Grid size={3}>
            <Paper sx={{ width: '100%', height: '100%', backgroundColor: theme.palette.background.paper, p: 1 }}>
              <FeedForm />
            </Paper>
          </Grid>
          <Grid size={9} sx={{ backgroundColor: theme.palette.background.paper }}>
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2} flex={1} m={2}>
              <Stack
                direction={{ xs: 'row', sm: 'row' }}
                justifyContent={'space-btween'}
                width={'100%'}
                height={10}
                flex={1}
                spacing={1}
                p={0}
              >
                <Button
                  data-testid="forecast-setbase"
                  variant="contained"
                  size="large"
                  sx={{ width: 160, backgroundColor: theme.palette.background.baseline }}
                  onClick={setBaseline}
                >
                  SET BASELINE
                </Button>

                {MainHighlightData()}
              </Stack>
              <Paper sx={{ height: '100%' }}>
                <TabSection />
                {value == 0 ? <ForecastGrid shiftData={undefined}></ForecastGrid> : <></>}
                {value == 1 ? <ForecastShiftDetailsGrid shiftData={undefined}></ForecastShiftDetailsGrid> : <></>}
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </>
    );
  };

  let today = dayjs();
  const theme = useTheme();
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
    </Box>
  );
};
