class GoldDistribution {
  liberated;
  exposed;
  porous;
  modelau;
  inaccessible;

  constructor({ liberated, exposed, porous, inaccessible, modelau }) {
    this.liberated = liberated;
    this.exposed = exposed;
    this.porous = porous;
    this.inaccessible = inaccessible;
    this.modelau = modelau;
  }

  static from_old_json(json) {
    return new GoldDistribution({
      liberated: json.liberated_au,
      exposed: json.exposed_au,
      porous: json.porous_au,
      inaccessible: json.inaccessible_au,
      modelau: json.model_au
    });
  }

  to_old_json() {
    var json = {};
    json.liberated_au = this.liberated;
    json.exposed_au = this.exposed;
    json.porous_au = this.porous;
    json.inaccessible_au = this.inaccessible;
    json.model_au = this.modelau;
    return json;
  }
}

export default GoldDistribution;
