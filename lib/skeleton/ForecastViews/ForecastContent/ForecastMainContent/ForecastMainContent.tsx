import {
  Box,
  BoxProps,
  Button,
  Card,
  Skeleton,
  Grid2 as Grid,
  Stack,
  Typography,
  Paper,
  useTheme,
  styled,
  Divider,
} from '@mui/material';

import dayjs from 'dayjs';
import { ForecastGrid } from '../ForecastGrid/ForecastGrid';
import { OdsHighlightDataModel } from 'models/OdsHighlightData';
import { OdsHighlightData } from 'components/HighlightData/OdsHighlightData';

export type ForecastMainContentProps = BoxProps & {
  pageName: string;
  tankDetails: object;
};

const setBaseline = () => {};

interface mainDetailsValues {
  mainHeading: string;
  details: Array<object>;
}

export const ForecastMainContent = (props: ForecastMainContentProps) => {
  const { ...headerDetails } = props;
  const theme = useTheme();

  const StyledStack = styled(Stack)(() => ({
    display: 'flex',
    gap: theme.spacing(1),
    width: '100%',
  }));

  const MainData = (data: mainDetailsValues) => {
    return (
      <>
        <StyledStack flexDirection="column" justifyContent="space-evenly" padding={theme.spacing(2)}>
          <StyledStack flexDirection="row" justifyContent="flex-start" mx={5}></StyledStack>
          <StyledStack flexDirection="row" justifyContent="space-evenly">
            {data.details.map((element) => (
              <div key={element.name}>
                <Typography variant="h6" color="grey.400" noWrap>
                  {element.name}
                </Typography>
                <Typography variant="h4" noWrap>
                  {element.value} {element.unit}
                </Typography>
                <Divider />
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
          name: 'Gold Recovered',
          value: Number(43).toLocaleString(navigator.languages, {
            minimumFractionDigits: 3,
          }),
          unit: '(g/h)',
        },
        {
          name: 'Gold Recovery',
          value: Number(45).toLocaleString(navigator.languages, {
            minimumFractionDigits: 3,
          }),
          unit: '(%)',
        },
      ],
      mainHeading: 'Gold',
    };

    let cyanideDetails: mainDetailsValues = {
      details: [
        {
          name: 'CN Added ',
          value: Number(4).toLocaleString(navigator.languages, {
            minimumFractionDigits: 3,
          }),
          unit: '(kg/t)',
        },
        {
          name: 'CN Used ',
          value: Number(56).toLocaleString(navigator.languages, {
            minimumFractionDigits: 3,
          }),
          unit: '(kg/h)',
        },
        {
          name: 'Tailings CN',
          value: Number(56).toLocaleString(navigator.languages, {
            minimumFractionDigits: 3,
          }),
          unit: '(ppm)',
        },
      ],
      mainHeading: 'Cyanide',
    };
    let totalDetails: mainDetailsValues = {
      details: [
        {
          name: 'Total Value ',
          value: Number(4).toLocaleString(navigator.languages, {
            minimumFractionDigits: 3,
          }),
          unit: '($/h)',
        },
      ],
      mainHeading: 'total',
    };
    return (
      <>
        <Grid container spacing={2} m={2}>
          <Grid size={{ xs: 4, md: 4, lg: 4, xl: 4 }}>
            <Paper sx={{}}>{MainData(totalDetails)}</Paper>
          </Grid>
          <Grid size={{ xs: 4, md: 4, lg: 4, xl: 4 }}>{<Paper>{MainData(goldDetails)}</Paper>}</Grid>
          <Grid size={{ xs: 4, md: 4, lg: 4, xl: 4 }}>
            <Paper sx={{ width: 700 }}>{MainData(cyanideDetails)}</Paper>
          </Grid>
        </Grid>
      </>
    );
  };

  const withData = () => {
    return (
      <>
        <Grid
          container
          spacing={2}
          direction="row"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Grid size={3}>sdf</Grid>
          <Grid size={9}>
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
              <Stack
                direction={{ xs: 'row', sm: 'row' }}
                justifyContent={'space-btween'}
                width={'100%'}
                height={10}
                flex={1}
                spacing={2}
                p={3}
              >
                <Button
                  data-testid="forecast-setbase"
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{ width: 200 }}
                  onClick={setBaseline}
                >
                  SET BASELINE
                </Button>

                {MainHighlightData()}
              </Stack>
              <ForecastGrid shiftData={undefined}></ForecastGrid>
            </Stack>
          </Grid>
        </Grid>
      </>
    );
  };

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
      {withData(theme)}
    </Box>
  );
};
