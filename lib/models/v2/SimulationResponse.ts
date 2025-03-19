import SimulationRequest from './SimulationRequest';
import Stream from './Stream';
import LeachingControls from './LeachingControls';
import ProcessSummary from './ProcessSummary';
import GoldDistribution from './GoldDistribution';
import TankData from './TankData';

class SimulationResponse extends SimulationRequest {
  /** {model/v2/ProcessSummary} */
  summary;
  /** {model/v2/GoldDistribution} */
  feed_gold;
  /** {model/v2/TankDetails[]} */
  tanks;

  static from_old_json(json) {
    if (!json) {
      return null;
    }
    const forecast = new SimulationResponse();

    forecast.stream = Stream.from_old_json(json);
    forecast.controls = LeachingControls.from_old_json(json);
    forecast.summary = ProcessSummary.from_old_json(json);
    forecast.feed_gold = GoldDistribution.from_old_json(json.feedDistribution);
    forecast.tanks = json.tanks.map(TankData.from_old_json);

    return forecast;
  }

  to_old_json() {
    var json = {};
    this.stream.to_old_json(json);
    this.controls.to_old_json(json);
    this.summary.to_old_json(json);
    json.feedDistribution = this.feed_gold.to_old_json();
    json.tanks = this.tanks.map((tank, index) => {
      var tank_json = tank.to_old_json();
      tank_json.tankNo = index + 1;
      return tank_json;
    });

    return json;
  }
}

export default SimulationResponse;
