import { Box, BoxProps, Button, Card, Grid2 as Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { ShiftData } from 'models/ShiftData';
import dayjs from 'dayjs';
import { FeedDetails } from 'components/Feed/FeedDetails';
import { styled, useTheme } from '@mui/material/styles';
import OdsDoubleGaugeChart from 'components/GraphComponent/Graph/OdsDoubleGaugeChart';
import React from 'react';

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

  const StyledStack = styled(Stack)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    width: '100%',
  }));

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

  /* const OdsDoubleGaugeChartCom = (
    actual: number,
    forecast: number,
    title: string,
    titlePosition: string,
    maxValue: number,
  ) => {
    return (
      <OdsDoubleGaugeChart
        actual={actual}
        forecast={forecast}
        title={title}
        titlePosition={titlePosition}
        maxValue={maxValue}
      ></OdsDoubleGaugeChart>
    );
  }; */

  /* const MemoizedGaugeChart = React.memo(() => (
    <OdsDoubleGaugeChart actual={5} forecast={8} title={'Gold Recovered'} titlePosition={'bottom'} maxValue={19} />
  )); */
  const MemoizedGaugeChart = React.memo(OdsDoubleGaugeChart);

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
          <Grid size={{ xs: 7, md: 7, lg: 7, xl: 7 }} p={0}>
            <MainHighlightData />

            <Box sx={{ width: '100%', height: 500, spacing: 2, margin: 4 }}> hero section </Box>
          </Grid>
          <Grid size={{ xs: 2.5, md: 2.5, lg: 2.5, xl: 2.5 }}>
            <Grid container spacing={2} p={0} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
              <Grid>
                <Paper>
                  <MemoizedGaugeChart
                    actual={5}
                    forecast={8}
                    title="Gold Recovered"
                    titlePosition="bottom"
                    maxValue={19}
                  />
                </Paper>
              </Grid>
              <Grid>
                <Paper>
                  <MemoizedGaugeChart
                    actual={5}
                    forecast={20}
                    title="Unreacted Cyanide"
                    titlePosition="bottom"
                    maxValue={30}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
