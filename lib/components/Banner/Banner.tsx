import { Box, BoxProps, Divider, Paper, Skeleton, Stack, styled, Typography, useTheme } from '@mui/material';

export type BannerProps = BoxProps & {
  cumulativeResidenceTime: number;
  cyanideProfile_model_cn: number;
  leachingProfile_recovered_au: number;
  leachingProfile_recoverable_au: number;
  cnAdded: number;
};

export function Banner(props: BannerProps): JSX.Element {
  const {
    cumulativeResidenceTime,
    cyanideProfile_model_cn,
    leachingProfile_recovered_au,
    leachingProfile_recoverable_au,
    cnAdded,
    ...derivedProps
  } = props;
  const theme = useTheme();
  const StyledStack = styled(Stack)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    width: '100%',
  }));

  const displayValue = (value: number, unit: string) => {
    return (
      <Typography variant="h4" noWrap>
        {value} {unit}
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
                  <Typography variant="body1" color="grey.400" noWrap>
                    Recovered per hour
                  </Typography>
                  {leachingProfile_recovered_au ? (
                    displayValue(leachingProfile_recovered_au, 'g/h')
                  ) : (
                    <Skeleton width={'50%'} height={100}></Skeleton>
                  )}
                </StyledStack>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 5 }} />

                <StyledStack flexDirection="column" justifyContent="space-evenly">
                  <Typography variant="body1" color="grey.400" noWrap>
                    Recovery
                  </Typography>
                  {leachingProfile_recoverable_au ? (
                    displayValue(leachingProfile_recoverable_au, '%')
                  ) : (
                    <Skeleton width={'50%'} height={150}></Skeleton>
                  )}
                </StyledStack>
              </StyledStack>
            </StyledStack>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 5 }} />

            <StyledStack flexDirection="column" justifyContent="space-evenly">
              <StyledStack flexDirection="row" justifyContent="flex-start">
                <Typography variant="h4">Cyanide</Typography>
              </StyledStack>

              <StyledStack flexDirection="row" justifyContent="space-evenly">
                <StyledStack flexDirection="column" justifyContent="space-evenly">
                  <Typography variant="body1" color="grey.400">
                    Added
                  </Typography>
                  {cnAdded ? displayValue(cnAdded, 'kg') : <Skeleton width={'50%'} height={150}></Skeleton>}
                </StyledStack>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 5 }} />

                <StyledStack flexDirection="column" justifyContent="space-evenly">
                  <Typography variant="body1" color="grey.400" noWrap>
                    Used per hour
                  </Typography>
                  {cnAdded ? (
                    displayValue(cumulativeResidenceTime, 'kg/h')
                  ) : (
                    <Skeleton width={'50%'} height={150}></Skeleton>
                  )}
                </StyledStack>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 5 }} />

                <StyledStack flexDirection="column" justifyContent="space-evenly">
                  <Typography variant="body1" color="grey.400" noWrap>
                    Tailings Conc.
                  </Typography>
                  {cyanideProfile_model_cn ? (
                    displayValue(cyanideProfile_model_cn, 'ppm')
                  ) : (
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
