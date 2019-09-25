'use strict'

const RoofType = use('App/Models/RoofType');
const Constant = use('App/Models/Constant');
const RoofCalc = require('../../RoofCalc');

class RoofController {

  async all({ response }) {
    const matches = await RoofType.query().whereNot('status', 'inactive').fetch();
    const roofs = matches ? matches.toJSON() : [];
    console.log({roofs})

    try {
      return response.json({ success: true, roofs });
    } catch (error) {
      throw new Error('Could not find roofs.');
    }

  }

  async calculateMaterials({ request, response }) {
    const input = request.post();
    console.log(input)
    const roofCalc = new RoofCalc(input.lengths, input.angles)
    const data = await roofCalc.findMaterials(); 
    return response.json({ success: true, data });
  }

  async calculateRoof({ request, response }) {
    const input = request.post();
    console.log({input})
    const roofCalc = new RoofCalc(input.lengths, input.angles)
    const data = await roofCalc.findRoofMeasures();

    return response.json({ success: true, data });
  }

  doCalculations(data, cMap) {
    const cover_amount = RoofCalc.coverAmount(data.roofLengthA, data.roofLengthB, cMap.get('cover_width'));
    const ridge_amount = RoofCalc.ridgeAmount(data.roofLengthA, cMap.get('ridge'));
    const ridge_roll = RoofCalc.ridgeRoll(data.roofLengthA, cMap.get('ridge_roll'));
    const gable_fittings = RoofCalc.gableFittings(data.roofLengthB, cMap.get('gable_fittings'));
    const sub_roof = RoofCalc.subRoof(data.roofLengthA, cMap.get('sub_roof'));
    const screws_amount = RoofCalc.screwsAmount(cover_amount, cMap.get('cover_pr_m2'), cMap.get('affix_pr_m2'));

    return {
      trueRoofArea,
      cover_amount,
      ridge_amount,
      ridge_roll,
      gable_fittings,
      sub_roof,
      screws_amount,
    }
  }



}


module.exports = RoofController
