export interface Tank {
  residenceTime: number;
  cyanideProfile: {
    model_s: number;
    model_cu: number;
    model_cn: number;
  };
  doconc: number;
  vtank: number;
  cnadded: number;
  ph: number;
  fractionsolids: number;
  cumulativeResidenceTime: number;
  leachingProfile: {
    model_au: number;
    porous_au: number;
    liberated_au: number;
    exposed_au: number;
    inaccessible_au: number;
    recoverable_au?: number;
    recovered_au?: number;
  };
  tankNo: number;
}

interface FeedDistribution {
  model_au: number;
  exposed_au: number;
  inaccessible_au: number;
  liberated_au: number;
  porous_au: number;
}

interface ShiftDataProps {
  shiftId: string;
  gradeAu: number;
  p80: number;
  throughput: number;
  percentSolids: number;
  gradeCu: number;
  gradeS: number;
  tanks?: Tank[];
  auRecovered: number;
  auProduced: number;
  auTotal: number;
  cnAdded: number;
  cnUsed: number;
  cnConcTailing: number;
  maxCnConcTailing: number;
  feedDistribution: FeedDistribution;
  num_tanks: number;
  optimiser_duration: number;
  timestamp: string;
  RecordID: string;
  resultId: string;
  recordType: string;
  streamID: string;
}

interface LeachingProfile {
  model_au: number;
  inaccessible_au: number;
  recoverable_au?: number;
  recovered_au?: number;
}

interface TankData {
  leachingProfile: LeachingProfile;
}

export class ShiftData {
  shiftId: string;
  gradeAu: number;
  p80: number;
  throughput: number;
  percentSolids: number;
  gradeCu: number;
  gradeS: number;
  tanks: Tank[];
  feedAuMassGph: number;
  auRecovered: number;
  auProduced: number;
  auTotal: number;
  cnAdded: number;
  cnUsed: number;
  cnConcTailing: number;
  maxCnConcTailing: number;
  auSolutionPpm: number;
  unreactedCyanide: number | undefined;
  avgDoconc: number;
  auRecoveryAsMassFlow: number;
  auRecoveryAsPercentage: number;
  kgsPerTonneCnadded: number;
  feedDistribution: FeedDistribution;
  num_tanks: number;

  constructor(shiftData: ShiftDataProps) {
    this.shiftId = shiftData.shiftId;
    this.gradeAu = shiftData.gradeAu;
    this.p80 = shiftData.p80;
    this.throughput = shiftData.throughput;
    this.percentSolids = shiftData.percentSolids;
    this.gradeCu = shiftData.gradeCu;
    this.gradeS = shiftData.gradeS;
    this.tanks = shiftData.tanks ? shiftData.tanks : [];

    this.calculateRecoverableAu(this.tanks);

    this.feedAuMassGph = this.throughput * shiftData.gradeAu;

    const lastTank = shiftData.tanks ? shiftData.tanks[shiftData.tanks.length - 1] : undefined;
    this.auRecovered = shiftData.auRecovered;
    this.auProduced = shiftData.auProduced;
    this.auTotal = shiftData.auTotal;

    this.cnAdded = shiftData.cnAdded;
    this.cnUsed = shiftData.cnUsed;
    this.cnConcTailing = shiftData.cnConcTailing;
    this.maxCnConcTailing = shiftData.maxCnConcTailing;

    this.auSolutionPpm = this.calculateAuSolutionPpm();
    this.unreactedCyanide = lastTank?.cyanideProfile?.model_cn;
    this.avgDoconc = this.calculateAvgDoconc(shiftData);

    this.auRecoveryAsMassFlow = this.auProduced;
    this.auRecoveryAsPercentage = this.auRecovered;
    this.kgsPerTonneCnadded = this.cnAdded;

    this.feedDistribution = {
      model_au: shiftData.feedDistribution.model_au,
      exposed_au: shiftData.feedDistribution.exposed_au,
      inaccessible_au: shiftData.feedDistribution.inaccessible_au,
      liberated_au: shiftData.feedDistribution.liberated_au,
      porous_au: shiftData.feedDistribution.porous_au,
    };
  }

  getShiftDate(): string {
    return this.shiftId.split(' ')[0];
  }

  calculateAuSolutionPpm(): number {
    const solidsTph = this.throughput;
    const slurryTph = solidsTph / (this.percentSolids / 100);
    const liquorTph = slurryTph - solidsTph;

    return this.auProduced / liquorTph;
  }

  calculateAvgDoconc(shiftData: ShiftDataProps): number {
    const totalDoconc =
      shiftData.tanks?.reduce((total, tank) => {
        return total + tank.doconc;
      }, 0) || 0;

    const avgDoconc = totalDoconc / (shiftData.tanks?.length || 1);

    return avgDoconc;
  }

  calculateRecoverableAu(tanks: TankData[]): void {
    if (tanks) {
      tanks.forEach((tankData, idx) => {
        const leachingProfile = tankData.leachingProfile;
        leachingProfile.recoverable_au = leachingProfile.model_au - leachingProfile.inaccessible_au;

        if (idx === 0) {
          leachingProfile.recovered_au = leachingProfile.model_au;
        } else {
          leachingProfile.recovered_au = tanks[idx - 1].leachingProfile.model_au - tanks[idx].leachingProfile.model_au;
        }
      });
    }
  }
}
