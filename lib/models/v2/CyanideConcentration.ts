class CyanideConcentration {
  cn;
  cucn;
  scn;

  constructor({ cn, cucn, scn }) {
    this.cn = cn;
    this.cucn = cucn;
    this.scn = scn;
  }

  static from_old_json(json) {
    return new CyanideConcentration({
      cn: json.model_cn,
      cucn: json.model_cu,
      scn: json.model_s
    });
  }

  to_old_json() {
    var json = {};
    json.model_cn = this.cn;
    json.model_cu = this.cucn;
    json.model_s = this.scn;

    return json;
  }
}

export default CyanideConcentration;
