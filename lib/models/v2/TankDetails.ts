class TankDetails {
  volume;
  residence_time;
  cumulative_residence_time;
  cnadded;

  constructor({ volume, residence_time, cumulative_residence_time, cnadded }) {
    this.volume = volume;
    this.residence_time = residence_time;
    this.cumulative_residence_time = cumulative_residence_time;
    this.cnadded = cnadded;
  }

  static from_old_json(json) {
    return new TankDetails({
      cnadded: json.cnadded,
      volume: json.vtank,
      residence_time: json.residenceTime,
      cumulative_residence_time: json.cumulativeResidenceTime
    });
  }

  to_old_json(json) {
    json.cnadded = this.cnadded;
    json.vtank = this.volume;
    json.residenceTime = this.residence_time;
    json.cumulativeResidenceTime = this.cumulative_residence_time;
  }
}

export default TankDetails;
