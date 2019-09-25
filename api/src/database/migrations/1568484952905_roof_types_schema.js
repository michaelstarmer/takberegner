'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoofTypeSchema extends Schema {
  up () {
    this.table('roof_types', (table) => {
      // alter table
      table.enum('status', ['active', 'inactive']).defaultsTo('active').after('title');
      table.string('description').after('status');
    })
  }

  down () {
    this.table('roof_types', (table) => {
      // reverse alternations
      table.dropColumn('status');
      table.dropColumn('description');
    })
  }
}

module.exports = RoofTypeSchema
