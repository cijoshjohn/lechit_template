import { Box, Chip, Grid2 as Grid } from '@mui/material';
import GoldTank from 'assets/images/GoldTankImage.png';
import { Tank } from 'models/ShiftData';
import { useEffect, useRef, useState } from 'react';
import Carousel from 'react-spring-3d-carousel';
import { day1 } from '../../../src/stories/assets/StubShiftData';
export type OdsAvatarProps = {
  /**
   * Image Link.
   */
  imageLink: string;

  /**
   * Carosel type.
   */
  type: string;
  /**
   * Carosel total number.
   */
  totalNumber: number;

  /**
   * Tank Details.
   */
  tankDetails: Array<Tank>;
};

const getTanks = (detailsForTankGrid: Array<Tank>): Array<unknown> => {
  let results = [];
  detailsForTankGrid.map((item, index) =>
    results.push({
      key: index,
      content: (
        <Box key={item.tankNo}>
          <Grid container spacing={1} direction="row" justifyContent="space-evenly" alignItems="stretch">
            <Grid>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 0 }}>
                <Chip
                  label={'Tank ' + item.tankNo}
                  variant={'outlined'}
                  sx={{ marginBottom: '15px', marginLeft: '50px' }}
                ></Chip>
                <img src={GoldTank} alt="GoldTank" width={300} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ),
    }),
  );
  return results;
};

/**
 * A wrapper around MUI's {@link Avatar} component with auto-sizing and rendering of user's initials.
 */
export function CaroselComponent(props: OdsAvatarProps): JSX.Element {
  const { imageLink, type, totalNumber, tankDetails, ...derivedProps } = props;

  const slideNo = useRef(0);
  slideNo.current = 0;

  useEffect(() => {}, []);

  return (
    <Carousel
      slides={getTanks(tankDetails)}
      slideNo={Number(slideNo.current)}
      goToSlide={Number(slideNo.current)}
      offsetRadius={5}
      showNavigation={true}
      autoPlay={false}
      animationConfig={{ tension: 120, friction: 14 }}
    />
  );
}
