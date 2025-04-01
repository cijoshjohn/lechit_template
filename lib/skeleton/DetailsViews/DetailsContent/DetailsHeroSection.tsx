import { Box, Button, Card, Divider, Paper, Stack, StackProps, styled, Typography } from '@mui/material';
import { useState } from 'react';

import HeroImageIcon from '../../../../lib/assets/svg/hero-image-icon.svg';
import TableImageIcon from '../../../../lib/assets/svg/table-image-icon.svg';
import { OdsHighlightData } from 'components/HighlightData/OdsHighlightData';

export default function DetailsHeroSection() {
  const [isCarouselSelected, setIsCarouselSelected] = useState(true);

  const setDetails = () => {
    setIsCarouselSelected(!isCarouselSelected);
  };

  const ActiveItemSelector = () => {
    return (
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', zIndex: 100 }}>
        <Button
          onClick={setDetails}
          variant={isCarouselSelected ? 'contained' : 'outlined'}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            '& .MuiButton-icon': { marginRight: '0px!important', marginLeft: '0px!important' },
          }}
          //startIcon={<HeroImageIcon />}
        >
          H
        </Button>
        <Button
          variant={!isCarouselSelected ? 'contained' : 'outlined'}
          onClick={setDetails}
          data-testid="gridButton"
          sx={{
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            '& .MuiButton-icon': { marginRight: '0px!important', marginLeft: '0px!important' },
          }}
          //startIcon={<TableImageIcon />}
        >
          T
        </Button>
      </Stack>
    );
  };

  const DetailsBannerValue = () => {
    return (
      <Card>
        <StyledStack flexDirection="row" justifyContent="flex-start">
          <StyledStack flexDirection="column" justifyContent="flex-start">
            <Typography variant="h3">Gold</Typography>
            <StyledStack flexDirection="row" justifyContent="flex-start">
              <Typography variant="h5">Recoverd/Hours</Typography>
              <Typography variant="h3">xxx.g</Typography>
            </StyledStack>
          </StyledStack>

          <Divider />

          <StyledStack flexDirection="row" justifyContent="flex-start"></StyledStack>
        </StyledStack>
      </Card>
    );
  };

  const HeroDetails = () => {
    return (
      <>
        <OdsHighlightData data={undefined} sizePx={0} isShowDifference={true}></OdsHighlightData>
        <OdsHighlightData data={undefined} sizePx={0} isShowDifference={true}></OdsHighlightData>
      </>
    );
  };

  const StyledStack = styled(Stack)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    width: '100%',
  }));

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
        <Paper elevation={3} sx={{ width: '100%', padding: 4 }}>
          <StyledStack flexDirection="column" justifyContent="center">
            <StyledStack flexDirection="row" justifyContent="flex-end">
              <ActiveItemSelector />
            </StyledStack>

            <StyledStack flexDirection="row">
              <HeroDetails />
            </StyledStack>

            <StyledStack flexDirection="row">
              <Paper sx={{ width: '100%', height: '40vh' }}></Paper>
            </StyledStack>
          </StyledStack>
        </Paper>
      </Box>
    </>
  );
}
