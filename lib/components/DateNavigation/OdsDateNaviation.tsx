import { Button, ButtonProps, styled } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';

type IconColorType = 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
type StyledDateNaviagtionProps = {
  iconColor: IconColorType;
  currentDate: Dayjs;
  calculatedDatesCallback: (calculated: object, currentStartingDate: Dayjs) => void;
};

export type OdsDateNaviagtionPorps = ButtonProps &
  StyledDateNaviagtionProps & {
    isForward: boolean;
  };

//var theme = useTheme();

const StyledDateNaviagtion = styled(Button, {
  shouldForwardProp: (propName: string) => !['sizePx', 'userColor'].includes(propName), // Exclude custom keys.
})<OdsDateNaviagtionPorps & StyledDateNaviagtionProps>(({ iconColor }) => ({
  backgroundColor: iconColor,
  width: 10,
  border: '2px solid',
  height: 'inital',
}));

const getCurrent = (currentDate: Dayjs) => {
  const meridiem = currentDate.format('A');
  if (meridiem == 'AM') {
    return [
      currentDate.hour(8).minute(0).second(0).format('YYYYMMDDA').replace('M', ''),
      currentDate.format('YYYYMMDDA').replace('M', ''),
    ];
  } else {
    return [
      currentDate.hour(8).minute(0).second(0).format('YYYYMMDDA').replace('M', ''),
      currentDate.format('YYYYMMDDA').replace('M', ''),
    ];
  }
};

const getPrevious = (currentDate: Dayjs) => {
  return [
    currentDate.hour(-36).minute(0).second(0).format('YYYYMMDDA').replace('M', ''),
    currentDate.format('YYYYMMDDA').replace('M', ''),
  ];
};

const getFuture = (currentDate: Dayjs) => {
  const meridiem = currentDate.format('A');
  if (meridiem == 'AM') {
    return [
      currentDate.format('YYYYMMDDA').replace('M', ''),
      currentDate.hour(8).minute(0).second(0).format('YYYYMMDDA').replace('M', ''),
    ];
  } else {
    return [
      currentDate.format('YYYYMMDDA').replace('M', ''),
      currentDate.hour(8).minute(0).second(0).format('YYYYMMDDA').replace('M', ''),
    ];
  }
};

/**
 * A list containing navigation items, designed to sit in the side bar.
 */
export function OdsDateNaviation(props: OdsDateNaviagtionPorps) {
  let { isForward, iconColor, currentDate, calculatedDatesCallback } = props;

  iconColor = iconColor ?? 'primary';
  let currentStartingDate = currentDate ?? dayjs();

  const gotoForwardShifts = (currentDateVal: Dayjs) => {
    let newData = {
      previous: getPrevious(currentDateVal),
      current: getCurrent(currentDateVal),
      future: getFuture(currentDateVal),
    };

    calculatedDatesCallback(newData, currentDateVal.add(1, 'day'));
  };

  const gotoBackwardShifts = (currentDateVal: Dayjs) => {
    let newData = {
      previous: getPrevious(currentDateVal),
      current: getCurrent(currentDateVal),
      future: getFuture(currentDateVal),
    };

    calculatedDatesCallback(newData, currentDateVal.subtract(1, 'day'));
  };
  const setNextDate = (isNext: boolean) => {
    if (isNext) {
      currentStartingDate.add(1, 'day');
    } else {
      currentStartingDate.subtract(1, 'day');
    }
  };

  return (
    <>
      {isForward ? (
        <StyledDateNaviagtion
          color={iconColor ?? 'primary'}
          onClick={() => {
            gotoForwardShifts(currentStartingDate);
            setNextDate(true);
          }}
          startIcon={<ArrowForwardIos data-testid="ArrowForwardIosIcon" />}
        ></StyledDateNaviagtion>
      ) : (
        <StyledDateNaviagtion
          color={iconColor ?? 'primary'}
          onClick={() => {
            gotoBackwardShifts(currentStartingDate);
            setNextDate(false);
          }}
          startIcon={<ArrowBackIos data-testid="ArrowBackIosIcon" />}
        ></StyledDateNaviagtion>
      )}
    </>
  );
}
