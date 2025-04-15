import { Box, Chip, Grid2 as Grid, useTheme } from '@mui/material';
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

  /**
   * On Slide change
   */
  slideChange: (index) => object;
};

const getTanks = (detailsForTankGrid: Array<Tank>): Array<unknown> => {
  let results = [];
  let theme = useTheme();
  detailsForTankGrid.map((item, index) =>
    results.push({
      key: index,
      content: (
        <Box key={item.tankNo}>
          <Grid container spacing={1} direction="row" justifyContent="space-evenly" alignItems="stretch">
            <Grid>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 0 }}>
                <img src={GoldTank} alt="GoldTank" width={250} />
                <Chip
                  label={'Tank ' + item.tankNo}
                  variant={'outlined'}
                  sx={{ marginTop: '10px', marginLeft: '50px', fontSize: theme.typography.h4.fontSize }}
                ></Chip>
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
  const { imageLink, type, totalNumber, tankDetails, slideChange, ...derivedProps } = props;

  let slideNo = 0;

  const handleKeyDownPrev = () => {
    if (slideNo == 0) {
      slideNo = tankDetails.length - 1;
    } else {
      slideNo = slideNo - 1;
    }
    slideChange(slideNo);
  };
  const handleKeyDownNext = () => {
    if (slideNo == tankDetails.length - 1) {
      slideNo = 0;
    } else {
      slideNo = slideNo + 1;
    }
    slideChange(slideNo);
  };

  useEffect(() => {
    const imageElements = document.querySelectorAll('.css-1qzevvg img');
    if (imageElements) {
      if (imageElements[0]) imageElements[0].addEventListener('mousedown', handleKeyDownPrev);
      if (imageElements[1]) imageElements[1].addEventListener('mousedown', handleKeyDownNext);
    }
  }, [tankDetails]);

  return (
    <Carousel
      slides={getTanks(tankDetails)}
      slideNo={Number(slideNo)}
      goToSlide={Number(slideNo)}
      offsetRadius={5}
      showNavigation={true}
      autoPlay={false}
      animationConfig={{ tension: 120, friction: 14 }}
    />
  );
}
