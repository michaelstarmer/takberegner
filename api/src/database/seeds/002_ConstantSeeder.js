'use strict'

/*
|--------------------------------------------------------------------------
| ConstantSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Constant = use('App/Models/Constant')

class ConstantSeeder {
  async run () {
    try {
      await Constant.createMany([
        {
          name: 'cover_width',
          value: 1.27,
          type: 'Bredde takpanne',
        },
        {
          name: 'cover_height',
          value: 0.369,
          type: 'Høyde takpanne',
        },
        {
          name: 'ridge',
          value: 1.11,
          type: 'Mønepanne',
        },
        {
          name: 'gable_fittings',
          value: 1.11,
          type: 'Gavlbeslag',
        },
        {
          name: 'ridge_roll',
          value: 5.0,
          type: 'Mønerull',
        },
        {
          name: 'sub_roof',
          value: 1.95,
          type: 'Takfotbeslag',
        },
        {
          name: 'cover_pr_m2',
          value: 2.15,
          type: 'Dekning pr. m2',
        },
        {
          name: 'affix_pr_m2',
          value: 1.11,
          type: 'Feste pr. m2',
        },
      ]);

      console.log('Constants seeded.');
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ConstantSeeder
