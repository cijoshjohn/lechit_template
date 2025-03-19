import ActualsData from './ActualsData';

class RangeActualsData {
  constructor(rangeActualsData) {
    this.summary = new ActualsData(rangeActualsData.summary);
    this.shifts = rangeActualsData.shifts.map((s) => new ActualsData(s));
  }
}

export default RangeActualsData;
