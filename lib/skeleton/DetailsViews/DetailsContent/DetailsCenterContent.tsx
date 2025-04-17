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
import { day1 } from '../../../../src/stories/NewStubshiftData';
import { Code, GridView, BarChart } from '@mui/icons-material';
import { OdsGridComponent } from 'components/Grid/OdsGridComponent';
import {
  tankColumns,
  multiShiftColumnsBase,
  columnGroupingModel,
  columnGroupingBase,
} from '../../../../src/config/GridColumnDetails';
import RangeShiftData from 'models/RangeShiftData';
import { ShiftChartViewSkeleton } from 'skeleton/ShiftViews/ShiftViewsContent/ShiftChartViewSkeleton';

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
          <Typography variant="h3" fontSize={'2.5rem!important'}>
            Tanks
          </Typography>
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
              onClick={() => onContentChange('tankGrid')}
              data-testid="date-main"
            >
              <GridView />
            </IconButton>
            <IconButton
              aria-label="grid"
              color="primary"
              onClick={() => onContentChange('tankGraph')}
              data-testid="date-main"
            >
              <BarChart />
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
          padding={theme.spacing(1)}
          border={0.1}
          sx={{ backgroundColor: theme.palette.action.focus, width: '100%', overflowX: 'auto' }}
        >
          <StyledStack flexDirection="row" justifyContent="flex-start" p={1}>
            <Typography variant="h4">{data.mainHeading}</Typography>
          </StyledStack>
          {/* <StyledStack flexDirection="row" justifyContent="flex-start" p={1}>
            {data.details.map((element, index) => (
              <div key={element.name}>
                <Stack direction={'column'}>
                  <Typography variant="h6" noWrap>
                    {element.name}
                  </Typography>

                  <Stack direction={'row'} gap={1}>
                    <Typography
                      variant="h5"
                      color="overlays[0]"
                      noWrap
                      className="mono-text"
                      sx={{ letterSpacing: '-0.1px!important' }}
                    >
                      {element.value}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="overlays[0]"
                      noWrap
                      className="mono-text"
                      sx={{ letterSpacing: '-0.1px!important' }}
                    >
                      {element.unit}
                    </Typography>
                  </Stack>
                </Stack>
                {index == 0 ? (
                  <Divider orientation="vertical" variant="middle" flexItem sx={{ borderRightWidth: 4 }} />
                ) : (
                  <></>
                )}
              </div>
            ))}
          </StyledStack> */}

          <StyledStack flexDirection="row" justifyContent="space-around" p={1}>
            {data.details.map((element, index) => (
              <React.Fragment key={index}>
                <Stack direction="column">
                  <Typography variant="h6" noWrap>
                    {element.name}
                  </Typography>
                  <Stack direction="row" gap={1}>
                    <Typography
                      variant="h5"
                      color="overlays[0]"
                      noWrap
                      className="mono-text"
                      sx={{ letterSpacing: '-0.1px!important' }}
                    >
                      {element.value}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="overlays[0]"
                      noWrap
                      className="mono-text"
                      sx={{ letterSpacing: '-0.1px!important' }}
                    >
                      {element.unit}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Insert divider BETWEEN items, not after the last one */}
                {index < data.details.length - 1 && (
                  <Divider orientation="vertical" flexItem sx={{ mx: 2, borderRightWidth: 4 }} />
                )}
              </React.Fragment>
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
              maximumFractionDigits: 2,
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
              maximumFractionDigits: 2,
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
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            },
          ),
          unit: ' min',
        },
        {
          name: 'Concentrate',
          value: Number(currentShiftData.tanks[currentTankIndex].cyanideProfile.model_cn).toLocaleString(
            navigator.languages,
            {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            },
          ),
          unit: ' ppm',
        },
      ],
      mainHeading: 'Cyanide',
    };
    return (
      <>
        <Grid container spacing={2} margin={1}>
          <Grid size={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
            <Box width={'100%'}>{MainData(goldDetails)}</Box>
          </Grid>

          <Grid size={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
            <Box width={'100%'}>{MainData(cyanideDetails)}</Box>
          </Grid>
        </Grid>
      </>
    );
  };

  const GridDetails = () => {
    return (
      <>
        <OdsGridComponent
          gridRows={day1.tanks}
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
          columnGroupingModel={columnGroupingModel}
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
          <></>
        )}
        {mainContentType === 'tankGrid' ? GridDetails() : <></>}
        {mainContentType === 'tankGraph' ? <ShiftChartViewSkeleton chartData={[]} /> : <></>}
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
        gaugevalue={
          currentShiftData['summary']
            ? Number(currentShiftData['summary'].auProduced).toFixed(2).toString()
            : Number(currentShiftData.auProduced).toFixed(2).toString()
        }
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
          currentShiftData['summary']
            ? Number(currentShiftData['summary'].cnConcTailing).toFixed().toString()
            : Number(currentShiftData.cnConcTailing).toFixed().toString()
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
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" width="100%" sx={{ gap: 2 }}>
      <Box sx={{ flexGrow: 1, m: theme.spacing(0) }}>
        <Grid container spacing={2} p={2} justifyContent={'center'} alignContent={'center'} alignItems={'flex-start'}>
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
                <Paper sx={{ p: 1, height: '30vh' }}>{ConcentrateGaugeChart}</Paper>
              </Grid>
              <Grid>
                <Paper sx={{ p: 1, height: '30vh' }}>{TailingsGaugeChart}</Paper>
              </Grid>
            </Grid>{' '}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
