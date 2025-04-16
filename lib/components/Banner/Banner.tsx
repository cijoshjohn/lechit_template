import { Box, BoxProps, Divider, Paper, Skeleton, Stack, styled, Typography, useTheme } from '@mui/material';

export type BannerProps = BoxProps & {
  cnUsed: number;
  cnConcTailing: number;
  leachingProfile_recovered_au: number;
  leachingProfile_recoverable_au: number;
  cnAdded: number;
};

export function Banner(props: BannerProps): JSX.Element {
  const {
    cnUsed,
    cnConcTailing,
    leachingProfile_recovered_au,
    leachingProfile_recoverable_au,
    cnAdded,
    ...derivedProps
  } = props;
  const theme = useTheme();
  const StyledStack = styled(Stack)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(0.5),
    width: '100%',
  }));

  const displayValue = (value: number, unit: string, decimalUnit: number) => {
    return (
      <Typography variant="h4" className="mono-text" noWrap color="background.actuals">
        {Number(value).toLocaleString(navigator.languages, {
          minimumFractionDigits: decimalUnit,
          maximumFractionDigits: decimalUnit,
        })}
        {' ' + unit}
      </Typography>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 1,
        }}
      >
        <Box sx={{ width: '100%', padding: 1 }}>
          <StyledStack flexDirection="row" justifyContent="center">
            <StyledStack flexDirection="column" justifyContent="space-evenly">
              <StyledStack flexDirection="row" justifyContent="flex-start">
                <Typography variant="h4">Gold</Typography>
              </StyledStack>

              <StyledStack flexDirection="row" justifyContent="space-evenly">
                <StyledStack flexDirection="column" justifyContent="space-evenly">
                  <Typography variant="h6" color="grey.600" noWrap>
                    Recovered
                  </Typography>
                  {leachingProfile_recovered_au ? (
                    displayValue(leachingProfile_recovered_au, 'g/h', 1)
                  ) : (
                    <Skeleton width={'50%'} height={100}></Skeleton>
                  )}
                </StyledStack>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 5, borderRightWidth: 4 }} />

                <StyledStack flexDirection="column" justifyContent="space-evenly">
                  <Typography variant="h6" color="grey.600" noWrap>
                    Recovery
                  </Typography>
                  {leachingProfile_recoverable_au ? (
                    displayValue(leachingProfile_recoverable_au, '%', 1)
                  ) : (
                    <Skeleton width={'50%'} height={150}></Skeleton>
                  )}
                </StyledStack>
              </StyledStack>
            </StyledStack>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 5, borderRightWidth: 4 }} />

            <StyledStack flexDirection="column" justifyContent="space-evenly">
              <StyledStack flexDirection="row" justifyContent="flex-start">
                <Typography variant="h4">Cyanide</Typography>
              </StyledStack>

              <StyledStack flexDirection="row" justifyContent="space-evenly">
                <StyledStack flexDirection="column" justifyContent="space-evenly">
                  <Typography variant="h6" color="grey.600">
                    Added
                  </Typography>
                  {cnAdded ? (
                    displayValue(cnAdded, 'kg', 2)
                  ) : (
                    // two deciaml
                    <Skeleton width={'50%'} height={150}></Skeleton>
                  )}
                </StyledStack>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 5, borderRightWidth: 4 }} />

                <StyledStack flexDirection="column" justifyContent="space-evenly">
                  <Typography variant="h6" color="grey.600" noWrap>
                    Used per hour
                  </Typography>
                  {cnUsed ? (
                    displayValue(cnUsed, 'kg/h', 2)
                  ) : (
                    //two decimal
                    <Skeleton width={'50%'} height={150}></Skeleton>
                  )}
                </StyledStack>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 5, borderRightWidth: 4 }} />

                <StyledStack flexDirection="column" justifyContent="space-evenly">
                  <Typography variant="h6" color="grey.600" noWrap>
                    Tailings Conc.
                  </Typography>
                  {cnConcTailing ? (
                    displayValue(cnConcTailing, 'ppm', 0)
                  ) : (
                    // zero decimal
                    <Skeleton width={'50%'} height={150}></Skeleton>
                  )}
                </StyledStack>
              </StyledStack>
            </StyledStack>
          </StyledStack>
        </Box>
      </Box>
    </>
  );
}
