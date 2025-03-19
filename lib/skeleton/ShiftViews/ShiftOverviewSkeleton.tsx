import { Typography, Button, Skeleton, Box, BoxProps, Stack, Grid2 as Grid } from '@mui/material';

import { OdsHighlightData } from 'components/HighlightData/OdsHighlightData';
import { ShiftOverviewData } from 'models/ShiftOverviewData';
import OdsDoubleGaugeChart from 'components/GraphComponent/Graph/OdsDoubleGaugeChart';
import { OdsHighlightDataModel } from 'models/OdsHighlightData';

export type ShiftOverviewSkeletonProps = BoxProps & {
  title: string;
  isDataLoaded: boolean;
  shiftOverviewData: ShiftOverviewData;
  customizedHighlightFields: string[];
};

export type ShiftOverviewDynamicSectionProps = BoxProps & {
  fieldIds: string[];
  shiftOverviewData: ShiftOverviewData;
};

const GetHighlightDetails = (propData: OdsHighlightDataModel) => {
  return <OdsHighlightData sizePx={100} data={propData} />;
};

const DynamicHighlightSection = (props: ShiftOverviewDynamicSectionProps) => {
  const hightlightGrids = [];

  const fieldIds = props.fieldIds;
  const shiftOverviewData = props.shiftOverviewData;

  for (let fieldId of fieldIds) {
    hightlightGrids.push(
      <Grid
        size={{ xs: 6, md: 4, lg: 4, xl: 4 }}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {GetHighlightDetails({
          dataName: shiftOverviewData[fieldId].name,
          dataColor: '',
          actualValue: shiftOverviewData[fieldId].actual,
          actualColor: 'rgba(0, 118, 166, 1)',
          actualUnit: shiftOverviewData[fieldId].actualUnit,
          forecastValue: shiftOverviewData[fieldId].forecast,
          forecastColor: 'rgba(127, 127, 127, 1)',
          forecastUnit: shiftOverviewData[fieldId].forecastUnit,
        })}
      </Grid>,
    );
  }

  return hightlightGrids;
};

export const ShiftOverviewSkeleton = (props: ShiftOverviewSkeletonProps) => {
  const { title, isDataLoaded, shiftOverviewData, customizedHighlightFields } = props;

  return (
    <Box sx={{ boxShadow: 2, border: '.2px solid white' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          //height: '40%',
          gap: 0,
        }}
      >
        <Stack
          direction={{ xs: 'row', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            padding: 1,
            alignItems: 'space-between',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4" component="div" sx={{}}>
            {title}
          </Typography>

          <Button color="primary" size="small" sx={{ fontSize: 'large', textDecoration: 'underline' }}>
            Details {'>'}
          </Button>
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
          {isDataLoaded ? (
            <Grid
              container
              spacing={0}
              sx={{
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Grid
                size={{ xs: 6, md: 4, lg: 4, xl: 4 }}
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                gap={2}
              >
                {GetHighlightDetails({
                  dataName: 'Throughput',
                  dataColor: '',
                  actualValue: shiftOverviewData['throughput'].actual,
                  actualColor: 'rgba(0, 118, 166, 1)',
                  actualUnit: 'ppm',
                  forecastValue: shiftOverviewData['throughput'].forecast,
                  forecastColor: 'rgba(127, 127, 127, 1)',
                  forecastUnit: 'ppm',
                })}
              </Grid>
              <Grid
                size={{ xs: 6, md: 4, lg: 4, xl: 4 }}
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {GetHighlightDetails({
                  dataName: 'P80',
                  dataColor: '',
                  actualValue: shiftOverviewData['p80'].actual,
                  actualColor: 'rgba(0, 118, 166, 1)',
                  actualUnit: shiftOverviewData['p80'].actualUnit,
                  forecastValue: shiftOverviewData['p80'].forecast,
                  forecastColor: 'rgba(127, 127, 127, 1)',
                  forecastUnit: shiftOverviewData['p80'].forecastUnit,
                })}
              </Grid>
              <Grid
                size={{ xs: 6, md: 4, lg: 4, xl: 4 }}
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {GetHighlightDetails({
                  dataName: 'Solids',
                  dataColor: '',
                  actualValue: shiftOverviewData['percentSolids'].actual,
                  actualColor: 'rgba(0, 118, 166, 1)',
                  actualUnit: shiftOverviewData['percentSolids'].actualUnit,
                  forecastValue: shiftOverviewData['percentSolids'].forecast,
                  forecastColor: 'rgba(127, 127, 127, 1)',
                  forecastUnit: shiftOverviewData['percentSolids'].forecastUnit,
                })}
              </Grid>

              <DynamicHighlightSection fieldIds={customizedHighlightFields} shiftOverviewData={shiftOverviewData} />

              <Grid size={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
                <OdsDoubleGaugeChart
                  actual={shiftOverviewData['throughput'].actual}
                  forecast={shiftOverviewData['throughput'].forecast}
                  title={'Actual vs Forecast'}
                  titlePosition={'bottom'}
                  maxValue={null}
                />
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid size={{ xs: 12, md: 4, lg: 4, xl: 4 }}>
                <Skeleton variant="rectangular" height={300} animation="wave" />
              </Grid>
              <Grid size={{ xs: 12, md: 4, lg: 4, xl: 4 }}>
                <Skeleton variant="rectangular" height={300} animation="wave" />
              </Grid>
              <Grid size={{ xs: 12, md: 4, lg: 4, xl: 4 }}>
                <Skeleton variant="rectangular" height={300} animation="wave" />
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
