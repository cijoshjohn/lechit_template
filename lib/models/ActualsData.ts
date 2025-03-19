class ActualsData {
  constructor(shiftData) {
    this.shiftId = shiftData.shiftId;
    this.gradeAu = shiftData.gradeAu;
    this.p80 = shiftData.p80;
    this.throughput = shiftData?.throughput;
    this.percentSolids = shiftData?.percentSolids;
    this.gradeCu = shiftData.gradeCu;
    this.gradeS = shiftData.gradeS;
    this.tanks = shiftData?.tanks ? shiftData?.tanks : [];

    this.feedAuMassGph = this.throughput * shiftData?.gradeAu;
    this.auRecovered = shiftData.auRecovered;
    this.auProduced = shiftData.auProduced;
    this.auTotal = shiftData.auTotal;

    this.cnAdded = shiftData.cnAdded;
    this.cnUsed = shiftData.cnUsed;
    this.cnConcTailing = shiftData?.cnConcTailing;
    this.auRecovered = shiftData?.auRecovered; // TODO: Use this to replace auRecoveryAsPercentage
    this.auProduced = shiftData?.auProduced; // TODO: Use this to replace auRecoveryAsMassFlow

    this.auSolutionPpm = this.#calculateAuSolutionPpm();
    this.unreactedCyanide = this.cnConcTailing;
  }

  getShiftDate() {
    return this.shiftId.split(' ')[0];
  }

  #calculateAuSolutionPpm() {
    const solidsTph = this.throughput;
    const slurryTph = solidsTph / (this.percentSolids / 100);
    const liquorTph = slurryTph - solidsTph;

    return this.auProduced / liquorTph;
  }
}

export default ActualsData;
