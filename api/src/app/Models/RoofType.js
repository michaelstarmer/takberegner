'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RoofType extends Model {
  static get table() {
    return 'roof_types';
  }
}

module.exports = RoofType
