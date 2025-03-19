import { ShiftData } from './ShiftData';

interface RangeShiftDataInput {
  summary: any; // Replace 'any' with the actual type if known
  shifts: any[]; // Replace 'any' with the actual type if known
}

class RangeShiftData {
  summary: ShiftData | {};
  shifts: ShiftData[];

  constructor(rangeShiftData: RangeShiftDataInput) {
    this.summary = Object.keys(rangeShiftData.summary).length > 0 ? new ShiftData(rangeShiftData.summary) : {};
    this.shifts = rangeShiftData.shifts.length > 0 ? rangeShiftData.shifts.map((s) => new ShiftData(s)) : [];
  }
}

export default RangeShiftData;
