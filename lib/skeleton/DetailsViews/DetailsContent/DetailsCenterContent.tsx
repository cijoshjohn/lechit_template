/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, BoxProps, Grid2 as Grid, Paper, Stack, Typography, IconButton, Divider } from '@mui/material';
import { ShiftData } from 'models/ShiftData';
import dayjs from 'dayjs';
import { FeedDetails } from 'components/Feed/FeedDetails';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useMemo, useState } from 'react';
import OdsSingleGauge from 'components/GraphComponent/Graph/OdsSingleGauge/OdsSingleGaugeChart';
import { CaroselComponent } from 'components/Carosel/CaroselComponent';
import { day1 } from '../../../../src/stories/assets/StubShiftData';
import { Code, GridView } from '@mui/icons-material';
import { OdsGridComponent } from 'components/Grid/OdsGridComponent';
import {
  tankColumns,
  columnGroupingBase,
  multiShiftColumnsBase,
  columnGroupingModelBase,
} from '../../../../src/config/GridColumnDetails';
import RangeShiftData from 'models/RangeShiftData';

export type DetailsMainContentProps = BoxProps & {
  shiftData: ShiftData | object;
  pageName: string;
};

interface feedData {
  name: string;
  value: string | number;
  unit: string;
}

interface mainDetailsValues {
  mainHeading: string;
  details: Array<feedData>;
}

export const DetailsCenterContent = (props: DetailsMainContentProps) => {
  const { ...data } = props;
  const theme = useTheme();
  let today = dayjs();

  const [mainContentType, setMainContentType] = useState('tankDetails');

  const [currentShiftData] = useState(data.shiftData);
  const [currentTankIndex, setCurrentTankIndex] = useState(0);

  const StyledStack = styled(Stack)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    width: '100%',
  }));

  useEffect(() => {}, [mainContentType]);

  const onContentChange = (value: string) => {
    setMainContentType(value);
  };

  const SelectOption = () => {
    return (
      <>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant="h3">Tanks</Typography>
          <Stack direction={'row'} justifyContent={'flex-end'}>
            <IconButton
              aria-label="main"
              color="primary"
              onClick={() => onContentChange('tankDetails')}
              data-testid="date-main"
            >
              <Code />
            </IconButton>
            <IconButton
              aria-label="grid"
              color="primary"
              onClick={() => onContentChange('decrement')}
              data-testid="date-main"
            >
              <GridView />
            </IconButton>
          </Stack>
        </Stack>
      </>
    );
  };

  const MainData = (data: mainDetailsValues) => {
    return (
      <>
        <StyledStack
          flexDirection="column"
          justifyContent="center"
          padding={theme.spacing(4)}
          sx={{ backgroundColor: theme.palette.background.default }}
        >
          <StyledStack flexDirection="row" justifyContent="flex-start" mx={0}>
            <Typography variant="h4">{data.mainHeading}</Typography>
          </StyledStack>
          <StyledStack flexDirection="row" justifyContent="space-between">
            {data.details.map((element, index) => (
              <div key={element.name}>
                <Typography variant="h6" color="grey.600" noWrap>
                  {element.name}
                </Typography>

                <Stack direction={'row'} gap={1}>
                  <Typography variant="h4" noWrap className="mono-text">
                    {element.value}
                  </Typography>
                  <Typography variant="h4" noWrap className="mono-text">
                    {element.unit}
                  </Typography>
                </Stack>

                {index == 0 ? <Divider orientation="vertical" variant="middle" flexItem sx={{ opacity: 1 }} /> : <></>}
              </div>
            ))}
          </StyledStack>
        </StyledStack>
      </>
    );
  };

  const MainHighlightData = () => {
    let goldDetails: mainDetailsValues = {
      details: [
        {
          name: 'Recovered',
          value: Number(currentShiftData.tanks[currentTankIndex]?.leachingProfile?.recovered_au).toLocaleString(
            navigator.languages,
            {
              minimumFractionDigits: 2,
            },
          ),
          unit: ' g/h',
        },
        {
          name: 'Recoverable',
          value: Number(currentShiftData.tanks[currentTankIndex]?.leachingProfile?.recoverable_au).toLocaleString(
            navigator.languages,
            {
              minimumFractionDigits: 2,
            },
          ),
          unit: ' g/h',
        },
      ],
      mainHeading: 'Gold',
    };

    let cyanideDetails: mainDetailsValues = {
      details: [
        {
          name: 'Cumulative Residence',
          value: Number(currentShiftData.tanks[currentTankIndex].cumulativeResidenceTime).toLocaleString(
            navigator.languages,
            {
              minimumFractionDigits: 2,
            },
          ),
          unit: ' min',
        },
        {
          name: 'Concentrate',
          value: Number(currentShiftData.tanks[currentTankIndex].cyanideProfile.model_cn).toLocaleString(
            navigator.languages,
            {
              minimumFractionDigits: 2,
            },
          ),
          unit: ' ppm',
        },
      ],
      mainHeading: 'Cyanide',
    };
    return (
      <>
        <Grid container spacing={5} margin={1}>
          <Grid size={{ xs: 1, md: 1, lg: 1, xl: 1 }}></Grid>
          <Grid size={{ xs: 5, md: 5, lg: 5, xl: 5 }}>
            <Box width={'100%'}>{MainData(goldDetails)}</Box>
          </Grid>

          <Grid size={{ xs: 5, md: 5, lg: 5, xl: 5 }}>
            <Box width={'100%'}>{MainData(cyanideDetails)}</Box>
          </Grid>
          <Grid size={{ xs: 1, md: 1, lg: 1, xl: 1 }}></Grid>
        </Grid>
      </>
    );
  };

  const GridDetails = () => {
    return (
      <>
        <OdsGridComponent
          gridRows={[]}
          gridColumns={tankColumns}
          gridPageSize={0}
          gridPerPageOptions={[]}
          columnGroupingModel={columnGroupingBase}
          columns={[]}
        ></OdsGridComponent>
      </>
    );
  };

  const GridDetailsMultipleShifts = () => {
    return (
      <>
        <OdsGridComponent
          gridRows={[]}
          gridColumns={multiShiftColumnsBase}
          gridPageSize={0}
          gridPerPageOptions={[]}
          columnGroupingModel={columnGroupingModelBase}
          columns={[]}
        ></OdsGridComponent>
      </>
    );
  };

  const MainContentSingleShift = () => {
    return (
      <>
        {SelectOption()}

        {mainContentType === 'tankDetails' ? (
          <>
            <MainHighlightData />
            <CaroselComponent
              imageLink={''}
              type={''}
              totalNumber={0}
              tankDetails={currentShiftData['summary'] ? currentShiftData['summary'].tanks : currentShiftData.tanks}
              slideChange={function (index: number) {
                return setCurrentTankIndex(index);
              }}
            />
          </>
        ) : (
          GridDetails()
        )}
      </>
    );
  };

  const MainContentMultipleShift = () => {
    return (
      <>
        {SelectOption()}

        {mainContentType === 'tankDetails' ? (
          <>
            <MainHighlightData />
            <CaroselComponent
              imageLink={''}
              type={''}
              totalNumber={0}
              tankDetails={currentShiftData['summary'] ? currentShiftData['summary'].tanks : currentShiftData.tanks}
              slideChange={function (index: number) {
                return setCurrentTankIndex(index);
              }}
            />
          </>
        ) : (
          GridDetailsMultipleShifts()
        )}
      </>
    );
  };

  const ConcentrateGaugeChart = useMemo(
    () => (
      <OdsSingleGauge
        gaugevalue={currentShiftData['summary'] ? currentShiftData['summary'].auProduced : currentShiftData.auProduced}
        title="Concentrate"
        titlePosition="top"
        maxValue={currentShiftData['summary'] ? currentShiftData['summary'].auTotal : currentShiftData.auTotal}
        footerTitle={'Gold Recovered'}
        unit={'g/h'}
        mainColor={null}
      />
    ),
    [],
  );

  const TailingsGaugeChart = useMemo(
    () => (
      <OdsSingleGauge
        gaugevalue={
          currentShiftData['summary'] ? currentShiftData['summary'].cnConcTailing : currentShiftData.cnConcTailing
        }
        title="Tailings"
        titlePosition="top"
        maxValue={currentShiftData['summary'] ? currentShiftData['summary'].cnUsed : currentShiftData.cnUsed}
        footerTitle={'Unreacted Cyanide'}
        unit={'ppm'}
        mainColor={'#0000'}
      />
    ),
    [],
  );

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
      <Box sx={{ flexGrow: 1, m: theme.spacing(0) }}>
        <Grid container spacing={2} p={3} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
          <Grid size={{ xs: 2.5, md: 2.5, lg: 2.5, xl: 2.5 }} height={'100%'}>
            <FeedDetails shiftData={data.shiftData} sizePx={0}></FeedDetails>
          </Grid>
          <Grid size={{ xs: 7, md: 7, lg: 7, xl: 7 }} p={0} height={'100%'}>
            <Box sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
              <Paper sx={{ p: 1 }}>
                <Stack direction={'column'} gap={1} m={2} height={700} sx={{ backgroundColor: 'transparent' }}>
                  {data.shiftData['summary'] ? MainContentMultipleShift() : MainContentSingleShift()}
                </Stack>
              </Paper>
            </Box>
          </Grid>
          <Grid size={{ xs: 2.5, md: 2.5, lg: 2.5, xl: 2.5 }}>
            <Grid container spacing={2} p={0} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
              <Grid>
                <Paper sx={{ p: 2 }}>{ConcentrateGaugeChart}</Paper>
              </Grid>
              <Grid>
                <Paper sx={{ p: 2 }}>{TailingsGaugeChart}</Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
