const Constant = use('App/Models/Constant');

class RoofCalc {
  constructor(lengths, angles) {
    this.lengths = lengths;
    this.angles = angles;
  }

  async findMaterials() {
    const { lengths } = this;
    const constants = await Constant.all();

    const cMap = new Map();
    constants.toJSON().map(it => cMap.set(it.name, it.value));

    const cover_amount = this.coverAmount(lengths[0], lengths[1], cMap.get('cover_width'));
    const ridge_amount = this.ridgeAmount(lengths[0], cMap.get('ridge'));
    const ridge_roll = this.ridgeRoll(lengths[0], cMap.get('ridge_roll'));
    const gable_fittings = this.gableFittings(lengths[1], cMap.get('gable_fittings'));
    const sub_roof = this.subRoof(lengths[0], cMap.get('sub_roof'));
    const screws_amount = this.screwsAmount(cover_amount, cMap.get('cover_pr_m2'), cMap.get('affix_pr_m2'));

    let list = [
      { title: 'Antall takplater', value: cover_amount },
      { title: 'Antall mønepanner', value: ridge_amount },
      { title: 'Antall mønerull', value: ridge_roll },
      { title: 'Antall gavlbeslag', value: gable_fittings },
      { title: 'Antall takfotbeslag', value: sub_roof },
      { title: 'Antall skruer', value: screws_amount },
    ];
    
    return list;
  }

  async findRoofMeasures() {
    const { lengths, angles } = this;
    const constants = await Constant.all();

    const cMap = new Map();
    constants.toJSON().map(it => cMap.set(it.name, it.value));

    const baseRoofArea = this.baseRoofArea(lengths[0], lengths[1]);
    const trueRoofArea = this.trueRoofArea(lengths[0], lengths[1], angles[0]);
    const roofPitch = this.roofPitch(angles[0]);

    return { baseRoofArea, trueRoofArea, roofPitch };
  }

  baseRoofArea(roofLengthA, roofLengthB) {
    return Number(roofLengthA) * Number(roofLengthB);
  }

  trueRoofArea(roofLengthA, roofLengthB, angle) {
    if (!angle) return undefined;
    const trueRoofArea = (Number(roofLengthA) * Number(roofLengthB)) * this.roofPitch(angle);
    
    return Number(trueRoofArea.toFixed(1));
  }

  roofPitch(angle) {
    return this.__sec(this.__convertDegreesToRadians(angle));
  }

  __sec(deg) {
    return 1 / Math.cos(deg);
  }

  __convertDegreesToRadians(deg) {
    return deg * Math.PI / 180;
  }

  /**
   * Antall takpanner:
   * ((Taklengde B / Bredde takpanne)avrundet opp til nærmeste heltall) * Taklengde A * 2
   * @param {*} roofLengthA 
   * @param {*} roofLengthB 
   * @param {*} coverWidth 
   */
  coverAmount(roofLengthA, roofLengthB, coverWidth) {
    return Math.ceil(Number(roofLengthB) / Number(coverWidth)) * Number(roofLengthA) * 2; 
  }

  /**
   * Antall mønepanner:
   * ((Taklengde A / Mønepanne)avrundet opp til nærmeste heltall)
   * @param {*} roofLengthA 
   * @param {*} cRidge 
   */
  ridgeAmount(roofLengthA, cRidge) {
    return Math.ceil(Number(roofLengthA) / cRidge)
  }

  /**
   * Antall mønerull
   * ((Taklengde A / Mønerull)avrundet opp til nærmeste heltall)
   * @param {*} roofLengthA 
   * @param {*} cRidgeRoll 
   */
  ridgeRoll(roofLengthA, cRidgeRoll) {
    return Math.ceil(Number(roofLengthA) / cRidgeRoll);
  }

  /**
   * Antall gavlbeslag
   * ((Taklengde B / Gavlbeslag)avrundet opp til nærmeste heltall) * 2
   * @param {*} roofLengthB 
   * @param {*} cGableFittings 
   */
  gableFittings(roofLengthB, cGableFittings) {
    return Math.ceil(Number(roofLengthB) / cGableFittings) * 2;
  }

  /**
   * Antall takfotbeslag:
   * (((Taklengde A * 2) / Takfotbeslag)avrundet opp til nærmeste heltall)
   * @param {*} roofLengthA 
   * @param {*} cSubRoof 
   */
  subRoof(roofLengthA, cSubRoof) {
    return Math.ceil((Number(roofLengthA) * 2) / cSubRoof);
  }

  /**
   * Antall skruer:
   * (((Taklengde A * 2) / Takfotbeslag)avrundet opp til nærmeste heltall)
   * @param {*} coverAmount 
   * @param {*} coverSquared 
   * @param {*} affixSquared 
   */
  screwsAmount(coverAmount, coverSquared, affixSquared) {
    return Math.ceil((Number(coverAmount) / Number(coverSquared)) * Number(affixSquared));
  }
}

module.exports = RoofCalc;