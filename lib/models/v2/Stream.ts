class Stream {
  // tph: 130.0, p80: 12.5, percent_solids: 45.1, gold_ppm: 11.25, copper_percent: 1.0, sulphur_percent: 1.2
  tph;
  p80;
  percent_solids;
  gold_ppm;
  copper_percent;
  sulphur_percent;

  constructor({ tph, p80, percent_solids, gold_ppm, copper_percent, sulphur_percent }) {
    this.tph = tph;
    this.p80 = p80;
    this.percent_solids = percent_solids;
    this.gold_ppm = gold_ppm;
    this.copper_percent = copper_percent;
    this.sulphur_percent = sulphur_percent;
  }

  static from_old_json(json) {
    return new Stream({
      tph: json.throughput,
      p80: json.p80,
      percent_solids: json.percentSolids,
      gold_ppm: json.gradeAu,
      copper_percent: json.gradeCu,
      sulphur_percent: json.gradeS
    });
  }

  to_old_json(json) {
    json.throughput = this.tph;
    json.p80 = this.p80;
    json.percentSolids = this.percent_solids;
    json.gradeAu = this.gold_ppm;
    json.gradeCu = this.copper_percent;
    json.gradeS = this.sulphur_percent;
  }
}

export default Stream;
