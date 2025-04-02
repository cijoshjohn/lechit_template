import { Box, BoxProps, Grid2 as Grid, Paper, Stack, Typography, IconButton } from '@mui/material';
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
import { tankColumns, columnGroupingBase } from '../../../../src/config/GridColumnDetails';
export type DetailsMainContentProps = BoxProps & {
  shiftData: ShiftData;
  pageName: string;
};

interface feedData {
  name: string;
  value: number;
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
      <Stack direction={'row'} justifyContent={'flex-end'}>
        <IconButton
          aria-label="main"
          color="primary"
          onClick={() => onContentChange('tankDetails')}
          data-testid="date-decrement"
        >
          <Code />
        </IconButton>
        <IconButton
          aria-label="grid"
          color="primary"
          onClick={() => onContentChange('decrement')}
          data-testid="date-decrement"
        >
          <GridView />
        </IconButton>
      </Stack>
    );
  };

  const MainData = (data: mainDetailsValues) => {
    return (
      <>
        <StyledStack flexDirection="column" justifyContent="space-evenly" padding={theme.spacing(2)}>
          <StyledStack flexDirection="row" justifyContent="flex-start" mx={5}>
            <Typography variant="h4">{data.mainHeading}</Typography>
          </StyledStack>
          <StyledStack flexDirection="row" justifyContent="space-evenly">
            {data.details.map((element) => (
              <div key={element.name}>
                <Typography variant="h6" color="grey.400">
                  {element.name}
                </Typography>
                <Typography variant="h4">
                  {element.value} {element.unit}
                </Typography>
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
          name: 'AU Recovered(g/h)',
          value: 0,
          unit: '(g/h)',
        },
        {
          name: 'AU Recovered(g/h)',
          value: 0,
          unit: '(g/h)',
        },
      ],
      mainHeading: 'Gold',
    };

    let cyanideDetails: mainDetailsValues = {
      details: [
        {
          name: 'Cumulative Residence(min)',
          value: 0,
          unit: '(min)',
        },
        {
          name: 'CN- Conc(ppm)',
          value: 0,
          unit: '(ppm)',
        },
      ],
      mainHeading: 'Cyanide',
    };
    return (
      <>
        <Grid container spacing={2} margin={4}>
          <Grid size={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
            <Paper width={'100%'}>{MainData(goldDetails)}</Paper>
          </Grid>
          <Grid size={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
            <Paper width={'100%'}>{MainData(cyanideDetails)}</Paper>
          </Grid>
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

  const MainContent = () => {
    return (
      <>
        {SelectOption()}

        {mainContentType === 'tankDetails' ? (
          <>
            <MainHighlightData />
            <CaroselComponent imageLink={''} type={''} totalNumber={0} tankDetails={day1.tanks} />
          </>
        ) : (
          GridDetails()
        )}
      </>
    );
  };

  const ConcentrateGaugeChart = useMemo(
    () => (
      <OdsSingleGauge
        gaugevalue={5}
        title="Concentrate"
        titlePosition="top"
        maxValue={19}
        footerTitle={'Gold Recoverd'}
        unit={'g/h'}
        mainColor={null}
      />
    ),
    [],
  );

  const TailingsGaugeChart = useMemo(
    () => (
      <OdsSingleGauge
        gaugevalue={25}
        title="Tailings"
        titlePosition="top"
        maxValue={30}
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
              <Stack direction={'column'} gap={2} m={2} height={700} sx={{ backgroundColor: 'transparent' }}>
                {MainContent()}
              </Stack>
            </Box>
          </Grid>
          <Grid size={{ xs: 2.5, md: 2.5, lg: 2.5, xl: 2.5 }}>
            <Grid container spacing={2} p={0} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
              <Grid>
                <Paper>{ConcentrateGaugeChart}</Paper>
              </Grid>
              <Grid>
                <Paper>{TailingsGaugeChart}</Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
