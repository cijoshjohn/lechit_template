/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  styled,
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Popover,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import Calendar from '@mui/icons-material/Event';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { ArrowBackIos, ArrowForwardIos, CalendarToday } from '@mui/icons-material';

interface OdsDateOptionProps extends DatePickerProps<Dayjs> {
  /**
   * fix postion
   */
  align: string;
  /**
   * Start date on load
   */
  currentStartDate: Dayjs;
  endDate: Dayjs;
  fixedDateRange: number | string;
  minLimit: Dayjs;
  maxLimit: Dayjs;
  showFixedDateSelection: boolean;
  showSelectedDateLabel: boolean;
  showDateRangeNavigation: boolean;
}

type StyledDateProps = {
  align: string;
};

const StyledDateOption = styled(DateRangePicker, {
  shouldForwardProp: (propName: string) => !['align', 'currentStartDate', 'endDate'].includes(propName), // Exclude custom keys.
})<DatePickerProps<Dayjs> & StyledDateProps>(({ align }) => ({
  align: 'left',
}));

/*
 * A wrapper around MUI's {@link Avatar} component with auto-sizing and rendering of user's initials.
 */
export function OdsDateOption(props: OdsDateOptionProps): JSX.Element {
  const {
    // align,
    currentStartDate,
    endDate,
    fixedDateRange,
    // endDate,
    minLimit,
    maxLimit,
    showFixedDateSelection,
    showSelectedDateLabel,
    showDateRangeNavigation,
  } = props;

  let endDateValue = null;
  if (!endDate) {
    endDateValue = endDate;
  }

  const [dateMinLimit] = useState(minLimit);
  const [dateMaxLimit] = useState(maxLimit);
  const [dateRangeData, setDateRangeData] = useState<[Dayjs, unknown]>([
    currentStartDate ? currentStartDate : dayjs(),
    endDateValue,
  ]);
  const [dateInStringFormat, setDateInStringFormat] = useState<string>();
  const [shiftSelected, setShiftSelected] = useState<string>('unselected');
  const [dateFixedValue, setDateFixedValue] = useState<number | string>(fixedDateRange ? fixedDateRange : 'unselected');
  const [isShowFixedDateSelection] = useState(showFixedDateSelection ? showFixedDateSelection : true);
  const [isShowSelectedDateLabel] = useState(showSelectedDateLabel ? showSelectedDateLabel : true);
  const [isShowDateRangeNavigation] = useState(showDateRangeNavigation ? showDateRangeNavigation : true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // const theme = useTheme();

  const today = dayjs();
  const yesterday = today.subtract(1, 'day');
  const tomorrow = today.add(1, 'day');
  const last_7_days: [Dayjs, Dayjs] = [today.subtract(7, 'day'), today];
  const coming_7_days: [Dayjs, Dayjs] = [today, today.add(7, 'day')];
  const last_30_days: [Dayjs, Dayjs] = [today.subtract(30, 'day'), today];
  const this_month: [Dayjs, Dayjs] = [today.startOf('month'), today.endOf('month')];
  const last_month: [Dayjs, Dayjs] = [
    today.subtract(1, 'month').endOf('month'),
    today.subtract(1, 'month').startOf('month'),
  ];

  const predefinedRanges: [string | number, Dayjs | [Dayjs, Dayjs]][] = [
    ['yesterday', yesterday],
    ['today', today],
    ['tomorrow', tomorrow],
    ['last_7_days', last_7_days],
    ['coming_7_days', coming_7_days],
    ['last_30_days', last_30_days],
    ['this_month', this_month],
    ['last_month', last_month],
  ];

  const handleDateChange = (newValue: any | null) => {
    if (newValue) {
      const startDate = newValue[0];
      const endDate = newValue[1];
      let formattedStartDate = '';
      let formattedEndDate = '';
      if (startDate) {
        formattedStartDate = `${startDate.year()},${startDate.format('MMM')} ${startDate.date()}`;
        if (endDate) {
          formattedEndDate = '- ' + endDate.format('MMM') + ' ' + endDate.date();
        }

        const formattedDateRange = `${formattedStartDate}  ${formattedEndDate}`;
        setDateInStringFormat(formattedDateRange);
        // if(isPredefinedRange(newValue)){
        const selectValue = isPredefinedRange(newValue);
        if (selectValue) {
          setDateFixedValue(selectValue);
        }

        // }
      }
      setDateRangeData(newValue);
    }
  };

  const isPredefinedRange = (newValue: [any, any] | any | null) => {
    if (!newValue) return null;

    if (Array.isArray(newValue)) {
      return predefinedRanges.find(([key, range]) => {
        if (Array.isArray(range)) {
          return range[0].isSame(newValue[0]) && range[1].isSame(newValue[1]);
        } else {
          return false;
        }
      })?.[0];
    } else {
      return predefinedRanges.find(([key, range]) => {
        if (!Array.isArray(range)) {
          return newValue.isSame(range);
        }
        return false;
      })?.[0];
    }
  };

  useEffect(() => {
    handleDateChange(dateRangeData);
  }, [dateFixedValue]);

  const handleFixDateChange = (newValue: number | string | any) => {
    if (typeof newValue.target.value === 'string') {
      const today = dayjs();
      if (newValue.target.value == 'this_month') {
        const startOfMonth = today.startOf('month');
        const endOfMonth = today.endOf('month');
        setDateRangeData([startOfMonth, endOfMonth]);
        handleDateChange([startOfMonth, endOfMonth]);
      } else {
        const startOfLastMonth = today.subtract(1, 'month').startOf('month');
        const endOfLastMonth = today.subtract(1, 'month').endOf('month');
        setDateRangeData([startOfLastMonth, endOfLastMonth]);
        handleDateChange([startOfLastMonth, endOfLastMonth]);
      }
    } else {
      const today = dayjs();

      if (Math.abs(newValue.target.value) == 1 || 0) {
        if (newValue.target.value > 0) {
          var newDate = today.add(Math.abs(newValue.target.value), 'day');
          setDateRangeData([newDate, null]);
          handleDateChange([newDate, null]);
        } else {
          var newDate = today.subtract(Math.abs(newValue.target.value), 'day');
          setDateRangeData([newDate, null]);
          handleDateChange([newDate, null]);
        }
      } else {
        let newDatefirst = today;
        let newDateLast = null;
        if (newValue.target.value > 0) {
          newDatefirst = today;
          newDateLast = today.add(Math.abs(newValue.target.value), 'day');
        } else {
          newDatefirst = today.subtract(Math.abs(newValue.target.value), 'day');
          if (newValue.target.value != 0) newDateLast = today;
        }
        setDateRangeData([newDatefirst, newDateLast]);
        handleDateChange([newDatefirst, newDateLast]);
      }
    }
  };

  const handleShiftChange = (newValue: object) => {
    setShiftSelected(newValue?.target?.value);
  };

  // const AnalyzeDateRange = (dates) => {
  //   let today = nowSiteTime();
  //   today.setHours(0, 0, 0, 0);
  //   setDateFixedValue('');

  //   if (dates[1] == null) {
  //     const converted = dayjs(dates[0]).toDate();
  //     converted.setHours(0, 0, 0, 0);
  //     const dateDiff = converted.getTime() - today.getTime();
  //     const daysDiff = Math.round(dateDiff / (1000 * 60 * 60 * 24));

  //     if (Math.abs(daysDiff) == 0) {
  //       setDateFixedValue(0); // Today
  //     } else if (daysDiff == 1) {
  //       setDateFixedValue(1); // Tomorrow
  //     } else if (daysDiff == -1) {
  //       setDateFixedValue(-1); // Yesterday
  //     } else {
  //       setDateFixedValue('');
  //     }
  //   } else {
  //     const year = today.getFullYear();
  //     const month = today.toLocaleString('default', { month: 'numeric', minimumIntegerDigits: 2 }).padStart(2, '0');
  //     const day = String(today.getDate()).padStart(2, '0');
  //     today = `${year}${month}${day}`;
  //     let startDate = dayjs(dates[0]).startOf('day').toDate();
  //     let endDate = dayjs(dates[1]).startOf('day').toDate();

  //     const daysDifference = endDate.getTime() - startDate.getTime();
  //     const days = Math.round(daysDifference / (1000 * 60 * 60 * 24));

  //     startDate = getDateString(startDate);
  //     endDate = getDateString(endDate);

  //     if (startDate == today || endDate == today) {
  //       if (startDate == today && days === 7) {
  //         setDateFixedValue(7); // Next 7 days
  //       } else if (endDate == today && days === 7) {
  //         setDateFixedValue(-7); // Last 7 days
  //       } else if (endDate == today && days === 30) {
  //         setDateFixedValue(-30); // Last 30 days
  //       } else {
  //         setDateFixedValue(''); // Other date ranges
  //       }
  //     }

  //     let thisMonthLimit = getThisMonthStartEnd();
  //     if (
  //       dayjs(thisMonthLimit[0]).format('YYYYMMDD') == startDate &&
  //       dayjs(thisMonthLimit[1]).format('YYYYMMDD') == endDate
  //     ) {
  //       setDateFixedValue('this_month');
  //     }

  //     thisMonthLimit = getPrevMonthStartEnd();
  //     if (
  //       thisMonthLimit[0].replace(/-/g, '').replace(/[a-zA-Z]/g, '') == startDate &&
  //       thisMonthLimit[1].replace(/-/g, '').replace(/[a-zA-Z]/g, '') == endDate
  //     ) {
  //       setDateFixedValue('last_month');
  //     }
  //   }
  // };

  const onDateChange = (val: string) => {
    const convertedDates = [];

    if (dateRangeData) {
      dateRangeData.forEach((element) => {
        if (dayjs(element).format('YYYY-MM-DD') != 'Invalid Date') {
          convertedDates.push(dayjs(element).format('YYYY-MM-DD'));
        }
      });

      if (dateRangeData[1] && dateRangeData[1] != null) {
        const diffDate = dayjs(dateRangeData[1]).diff(dateRangeData[0], 'day');
        if (val == 'increment') {
          const lastday = dayjs(dateRangeData[1]).add(diffDate, 'day');
          handleDateChange([dateRangeData[1], lastday]);
          setDateRangeData([dateRangeData[1], lastday]);
        } else if (val == 'decrement') {
          const firstDay = dayjs(dateRangeData[0]).subtract(diffDate, 'day');
          handleDateChange([firstDay, dateRangeData[0]]);
          setDateRangeData([firstDay, dateRangeData[0]]);
        }
      } else {
        if (val == 'increment') {
          handleDateChange([dayjs(dateRangeData[0]).add(1, 'day'), null]);
          setDateRangeData([dayjs(dateRangeData[0]).add(1, 'day'), null]);
        } else if (val == 'decrement') {
          handleDateChange([dayjs(dateRangeData[0]).subtract(1, 'day'), null]);
          setDateRangeData([dayjs(dateRangeData[0]).subtract(1, 'day'), null]);
        }
      }
    }
  };

  const FixedDatePicker = () => {
    return (
      <Select
        labelId="date-select-label"
        id="date-select"
        //label="Fixed range"
        data-testid="date-fixed-range"
        value={dateFixedValue}
        onChange={handleFixDateChange}
        sx={{ minWidth: 120 }}
      >
        <MenuItem value={'unselected'} data-testid="unselected_option">
          <Typography variant="body1">Select</Typography>
        </MenuItem>
        <MenuItem value={-1} data-testid="-1_option" className="mono-text">
          Yesterday
        </MenuItem>
        <MenuItem value={0} data-testid="0_option" className="mono-text">
          Today
        </MenuItem>
        <MenuItem value={1} data-testid="1_option" className="mono-text">
          Tomorrow
        </MenuItem>
        <MenuItem value={7} data-testid="7_option" className="mono-text">
          Next 7 days
        </MenuItem>
        <MenuItem value={-7} data-testid="-7_option" className="mono-text">
          Last 7 days
        </MenuItem>
        <MenuItem value={-30} data-testid="-30_option" className="mono-text">
          Last 30 days
        </MenuItem>
        <MenuItem value={'this_month'} data-testid="this_month_option" className="mono-text">
          This Month
        </MenuItem>
        <MenuItem value={'last_month'} data-testid="last_month_option" className="mono-text">
          Last Month
        </MenuItem>
      </Select>
    );
  };

  const MainLable = () => {
    return (
      <>
        <Typography variant="h4" component="h4" data-testid="date-display" className="mono-text" paddingBottom={5}>
          {dateInStringFormat}
        </Typography>
      </>
    );
  };

  const FixedShiftPicker = () => {
    return (
      <Select
        labelId="shift-select-label"
        id="shift-select"
        //label="Fixed range"
        data-testid="shift-fixed-range"
        value={shiftSelected}
        onChange={handleShiftChange}
        sx={{ minWidth: 120 }}
      >
        <MenuItem value={'unselected'} data-testid="unselected_option">
          <Typography variant="body1">Select Shift</Typography>
        </MenuItem>
        <MenuItem value={'A'} data-testid="-1_option" className="mono-text">
          Day
        </MenuItem>
        <MenuItem value={'P'} data-testid="0_option" className="mono-text">
          Night
        </MenuItem>
      </Select>
    );
  };

  const DateSection = () => {
    return (
      <>
        <Stack direction="row" spacing={1} alignItems="center">
          {isShowDateRangeNavigation ? (
            <FormControl id="date-decrement-button">
              <IconButton
                aria-label="decrement"
                color="primary"
                onClick={() => onDateChange('decrement')}
                data-testid="date-decrement"
              >
                <ArrowBackIos />
              </IconButton>
            </FormControl>
          ) : (
            <></>
          )}
          {isShowFixedDateSelection ? (
            <FormControl>
              <InputLabel id="date-select-label"></InputLabel>
              <FixedDatePicker />
            </FormControl>
          ) : (
            <></>
          )}

          <FormControl data-testid="date-picker-range">
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDateOption
                sx={{
                  minWidth: 275,
                  '& .MuiInputBase-input': { display: 'none' },
                  '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                }}
                slots={{ field: IconButton }}
                slotProps={{ textField: { InputProps: { endAdornment: <Calendar /> } } }}
                name="allowedRange"
                onChange={handleDateChange}
                format="YYYY-MM-DD"
                minDate={dateMinLimit}
                maxDate={dateMaxLimit}
                value={dateRangeData ? dateRangeData : [dayjs(), null]}
                align={''}
              />
            </LocalizationProvider> */}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <IconButton onClick={handleClick}>
                <CalendarToday />
              </IconButton>

              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              >
                <StyledDateOption
                  /* sx={{
                    minWidth: 275,
                    '& .MuiInputBase-input': { display: 'none' },
                    '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                  }} */
                  //slots={{ field: sin }}
                  //slotProps={{ textField: { InputProps: { endAdornment: <Calendar /> } } }}
                  name="allowedRange"
                  onChange={handleDateChange}
                  format="YYYY-MM-DD"
                  minDate={dateMinLimit}
                  maxDate={dateMaxLimit}
                  value={dateRangeData ? dateRangeData : [dayjs(), null]}
                  align={''}
                />
              </Popover>
            </LocalizationProvider>
          </FormControl>

          {isShowDateRangeNavigation ? (
            <FormControl id="date-increment-button">
              <IconButton
                aria-label="increment"
                color="primary"
                onClick={() => onDateChange('increment')}
                data-testid="date-increment"
              >
                <ArrowForwardIos />
              </IconButton>
            </FormControl>
          ) : (
            <></>
          )}

          {isShowDateRangeNavigation ? FixedShiftPicker() : <></>}
        </Stack>
      </>
    );
  };

  return (
    <>
      <Stack direction="column" spacing={1} alignItems="flex-start">
        {MainLable()}
        <div></div>
        <div></div>
        {DateSection()}
      </Stack>
    </>
  );
}
