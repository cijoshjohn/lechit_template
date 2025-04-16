import React, { useEffect, useState } from 'react';
import { Slider, Stack, Typography, styled } from '@mui/material';

type MultishiftSliderProps = {
  sliderVal?: number[];
  propertyName?: string;
  setSliderPropertyValue?: (propertyName: string, value: number[]) => void;
};

const StyledSlider = styled(Slider)(({ theme }) => ({
  minWidth: 170,
}));

export function MultishiftSlider(props: MultishiftSliderProps): JSX.Element {
  {
    const [currentSliderVal, setCurrentSliderVal] = useState(props.sliderVal);

    useEffect(() => {}, [currentSliderVal]);

    const handleSliderChange = (event: Event, newVal: number | number[], changePos: number) => {
      if (Array.isArray(newVal)) {
        let newValArray = [newVal[changePos], newVal[changePos]];

        setTimeout(() => {
          setCurrentSliderVal(newValArray);
          props.setSliderPropertyValue(props.propertyName, newValArray);
        }, 200);
      }
    };

    return (
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={0}>
        <Typography color="primary.secondary" fontWeight={400} data-testid="month-name">
          {currentSliderVal[1]}(%)
        </Typography>
        <StyledSlider
          valueLabelDisplay="auto"
          value={currentSliderVal}
          step={5}
          aria-label="Small"
          name={props.propertyName}
          marks
          min={-50}
          max={50}
          onChange={(event, newVal, thumb) => handleSliderChange(event, newVal, thumb)}
        />
      </Stack>
    );
  }
}
