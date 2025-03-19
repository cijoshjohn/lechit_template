class ProcessSummary {
  total_gold;
  gold_recovered;
  gold_recovery;
  tailing_cn_conc;
  cn_used;
  tailings_gold_conc;

  constructor({ total_gold, gold_recovered, gold_recovery, tailing_cn_conc, cn_used, tailings_gold_conc }) {
    this.total_gold = total_gold;
    this.gold_recovered = gold_recovered;
    this.gold_recovery = gold_recovery;
    this.tailing_cn_conc = tailing_cn_conc;
    this.cn_used = cn_used;
    this.tailings_gold_conc = tailings_gold_conc;
  }

  static from_old_json(json) {
    var lastTank = json.tanks[json.tanks.length - 1];

    return new ProcessSummary({
      total_gold: json.auTotal,
      gold_recovered: json.auProduced,
      gold_recovery: json.auRecovered,
      tailing_cn_conc: json.cnConcTailing,
      cn_used: json.cnUsed,
      tailings_gold_conc: lastTank.leachingProfile.model_au
    });
  }

  to_old_json(json) {
    json.auTotal = this.total_gold;
    json.auProduced = this.gold_recovered;
    json.auRecovered = this.gold_recovery;
    json.cnConcTailing = this.tailing_cn_conc;
    json.cnUsed = this.cn_used;
  }
}

export default ProcessSummary;
