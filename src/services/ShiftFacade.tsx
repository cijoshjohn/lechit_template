import dummyShiftData from '../../test_data/test_data.json';
import dummyShiftDataOther from '../../test_data/other_day.json';
import dayjs from 'dayjs';

class ShiftFacade {
  constructor() {}

  getShiftData(shiftDates) {
    //TODO: use the shiftDates to retrieve more data
    console.log("shift dates", shiftDates);

    const currentDate = dayjs();

    const currentDateStr = currentDate.format('YYYY-MM-DD');
    const previousDateStr = currentDate.subtract(1, 'day').format('YYYY-MM-DD');
    const nextDateStr = currentDate.add(1, 'day').format('YYYY-MM-DD');

    const previousDateExtraStr = currentDate.subtract(2, 'day').format('YYYY-MM-DD');
    const nextDateExtraStr = currentDate.add(2, 'day').format('YYYY-MM-DD');

    const shiftData = {}
    shiftData[previousDateStr] = dummyShiftData
    shiftData[currentDateStr] = dummyShiftData
    shiftData[nextDateStr] = dummyShiftData
    shiftData[previousDateExtraStr] = dummyShiftDataOther
    shiftData[nextDateExtraStr] = dummyShiftDataOther

    return Promise.resolve({
      shiftChartData: [1, 3, 5, 7, 9, 20],
      shiftData: shiftData,
    });
  }
}

export default ShiftFacade;
