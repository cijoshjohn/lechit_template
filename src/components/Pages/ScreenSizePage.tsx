import * as React from 'react';
import { Grid2 as Grid, Box, Paper, Typography, styled } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

/* xs, extra-small: 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px */

const ScreenSizePage = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 8, lg: 6, xl: 8 }}>
            <Item>xs=6 md=8</Item>
          </Grid>
          <Grid size={{ xs: 6, md: 4, lg: 6, xl: 4 }}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid size={{ xs: 6, md: 4, lg: 6, xl: 4 }}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid size={{ xs: 6, md: 8, lg: 6, xl: 8 }}>
            <Item>xs=6 md=8</Item>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, paddingTop: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Column Sizes at Different Breakpoints
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <Item>xs=12 sm=6 md=4 lg=3 xl=2</Item>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <Item>xs=12 sm=6 md=4 lg=3 xl=2</Item>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <Item>xs=12 sm=6 md=4 lg=3 xl=2</Item>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <Item>xs=12 sm=6 md=4 lg=3 xl=2</Item>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <Item>xs=12 sm=6 md=4 lg=3 xl=2</Item>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <Item>xs=12 sm=6 md=4 lg=3 xl=2</Item>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, paddingTop: 10 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Nested Grids with Breakpoints
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Item>xs=12 md=6</Item>
            <Grid container spacing={2} sx={{ paddingTop: 2 }}>
              <Grid size={{ xs: 6 }}>
                <Item>Nested xs=6</Item>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Item>Nested xs=6</Item>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Item>xs=12 md=6</Item>
            <Grid container spacing={2} sx={{ paddingTop: 2 }}>
              <Grid size={{ xs: 4 }}>
                <Item>Nested xs=4</Item>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Item>Nested xs=4</Item>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Item>Nested xs=4</Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, paddingTop: 10 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Auto Layout with Breakpoints
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: true }}>
            <Item>Auto</Item>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Item>xs=6</Item>
          </Grid>
          <Grid size={{ xs: true }}>
            <Item>Auto</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ScreenSizePage;
