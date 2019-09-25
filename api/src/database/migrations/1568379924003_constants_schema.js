'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConstantsSchema extends Schema {
  up () {
    this.create('constants', (table) => {
      table.increments()
      table.string('name', 50)
      table.float('value', 10)
      table.string('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('constants')
  }
}

module.exports = ConstantsSchema
