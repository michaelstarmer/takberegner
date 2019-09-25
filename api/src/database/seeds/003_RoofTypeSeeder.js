'use strict'

/*
|--------------------------------------------------------------------------
| RoofTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const RoofType = use('App/Models/RoofType');

class RoofTypeSeeder {
  async run () {
      const roofTypes = [
      {
        title: 'Tak 1',
        imgurl: '/img/1.gif',
        sidesnumber: 2,
        anglesnumber: 1,
        description: 'Den mest grunnleggende takformen. Vinkler og lengder begrenses til et minimum.'
      },
      {
        title: 'Tak 2',
        imgurl: '/img/2.gif',
        sidesnumber: 3,
        anglesnumber: 1,
        description: 'En vanlig utforming, men flere sider.'
      },
      {
        title: 'Tak 3',
        imgurl: '/img/3.gif',
        sidesnumber: 3,
        anglesnumber: 2,
        description: 'Flere vinkler og sider her.'
      },
      {
        title: 'Tak 4',
        imgurl: '/img/4.gif',
        sidesnumber: 4,
        anglesnumber: 2,
        description: 'For større taktyper, og kanskje eneboliger.'
      },
      {
        title: 'Tak 5',
        imgurl: '/img/5.gif',
        sidesnumber: 5,
        anglesnumber: 3,
        description: 'Mer komplekst, flere variabler.'
      },
      {
        title: 'Tak 6',
        imgurl: '/img/6.gif',
        sidesnumber: 6,
        anglesnumber: 3,
        description: 'Mer komplekst - flere vinkler og lengder. Håper du vet hva du gjør.'
      },

    ];

    try {
      await RoofType.createMany(roofTypes);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = RoofTypeSeeder
