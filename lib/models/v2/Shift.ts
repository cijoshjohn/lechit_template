import ShiftId from './ShiftId';
import SimulationResponse from './SimulationResponse';
import Stream from './Stream';
import LeachingControls from './LeachingControls';
import ProcessSummary from './ProcessSummary';
import GoldDistribution from './GoldDistribution';
import TankData from './TankData';
import TankDetails from './TankDetails';
import CyanideConcentration from './CyanideConcentration';

class Shift {
  /** {ShiftId} */
  id;

  /** {SimulationResponse} */
  forecast = null;
  actuals = null;
  // postdiction
  // what_if

  /**
   * @param {ShiftId} id
   */
  constructor(id) {
    this.id = id;
  }
}

export {
  Shift,
  ShiftId,
  SimulationResponse,
  Stream,
  LeachingControls,
  ProcessSummary,
  GoldDistribution,
  TankData,
  TankDetails,
  CyanideConcentration
};
