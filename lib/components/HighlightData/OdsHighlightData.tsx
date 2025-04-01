import { Card, CardProps, styled, Stack, Chip, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { OdsHighlightDataModel } from 'models/OdsHighlightData';
import { useTheme } from '@mui/material/styles';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

export type OdsHighlightDataProps = CardProps & {
  data: OdsHighlightDataModel;
  isShowDifference: boolean;
  sizePx: number;
};

type StyledCardProps = {
  sizePx: number;
  userColor: string;
};

const StyledCard = styled(Card, {
  shouldForwardProp: (propName: string) => !['sizePx', 'userColor'].includes(propName), // Exclude custom keys.
})<CardProps & StyledCardProps>(({ sizePx }) => ({
  fontSize: sizePx / 2, // Ensure text fits inside avatar - Half seems to fit well.
  width: '100%',
  margin: 1,
  justifyContent: 'center',
  alignItems: 'center',
}));

/*
 * A wrapper around MUI's {@link Avatar} component with auto-sizing and rendering of user's initials.
 */
export function OdsHighlightData(props: OdsHighlightDataProps): JSX.Element {
  const { data, sizePx, isShowDifference, ...derivedProps } = props;
  const userColor = deepPurple[400];
  const theme = useTheme();
  const difference: number = data ? ((data.actualValue - data.forecastValue) / data.actualValue) * 100 : 0;
  const boderColor = difference > 0 ? theme.palette.success.main : theme.palette.error.main;
  const hideDiffernce = isShowDifference ?? false;
  return (
    <StyledCard userColor={userColor} sizePx={sizePx} {...derivedProps} data-testid="highlight-data">
      <Stack
        direction={{ xs: 'row', sm: 'column' }}
        spacing={{ xs: 12, md: 1, lg: 1, xl: 1 }}
        sx={{
          padding: 1,
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" sx={{ color: data?.dataColor ?? '' }}>
          {data?.dataName}
        </Typography>

        <Typography variant="h6" sx={{ color: data?.actualColor ?? '', fontWeight: 'bold' }}>
          {data?.actualValue} {data?.actualUnit}
        </Typography>

        <Typography variant="h6" sx={{ color: data?.forecastColor ?? '', fontWeight: 'bold' }}>
          {data?.forecastValue} {data?.forecastUnit}
        </Typography>

        {hideDiffernce ? (
          <Chip
            label={difference.toFixed(4) + '%'}
            size="large"
            color={boderColor}
            variant="outlined"
            icon={difference > 0 ? <ArrowDropUp /> : <ArrowDropDown />}
            sx={{
              color: difference > 0 ? theme.palette.success.main : theme.palette.error.main,
              fontWeight: 'bold',
              width: 150,
            }}
          ></Chip>
        ) : (
          <></>
        )}
      </Stack>
    </StyledCard>
  );
}
