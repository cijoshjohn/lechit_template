import TankDetails from './TankDetails';
import GoldDistribution from './GoldDistribution';
import CyanideConcentration from './CyanideConcentration';

class TankData {
  details;
  gold_distribution;
  cn_profile;

  constructor({ details, gold_distribution, cn_profile }) {
    this.details = details;
    this.gold_distribution = gold_distribution;
    this.cn_profile = cn_profile;
  }

  static from_old_json(json) {
    const details = TankDetails.from_old_json(json);
    const gold_distribution = GoldDistribution.from_old_json(json.leachingProfile);
    const cn_profile = CyanideConcentration.from_old_json(json.cyanideProfile);
    return new TankData({ details, gold_distribution, cn_profile });
  }

  to_old_json() {
    var json = {};
    this.details.to_old_json(json);
    json.leachingProfile = this.gold_distribution.to_old_json();
    json.cyanideProfile = this.cn_profile.to_old_json();

    return json;
  }
}

export default TankData;
