class LeachingControls {
  cn_added;
  max_tailing_cn_conc;

  constructor({ cn_added, max_tailing_cn_conc }) {
    this.cn_added = cn_added;
    this.max_tailing_cn_conc = max_tailing_cn_conc;
  }

  static from_old_json(json) {
    return new LeachingControls({
      cn_added: json.cnAdded,
      max_tailing_cn_conc: json.maxCnConcTailing
    });
  }

  to_old_json(json) {
    json.cnAdded = this.cn_added;
    json.maxCnConcTailing = this.max_tailing_cn_conc;
  }
}

export default LeachingControls;
