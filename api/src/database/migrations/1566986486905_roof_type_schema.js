'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoofTypeSchema extends Schema {
  up () {
    this.create('roof_types', (table) => {
      table.increments()
      table.string('title', 50).notNullable().unique()
      table.string('imgurl', 254)
      table.integer('sidesnumber').notNullable()
      table.integer('anglesnumber').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('roof_types')
  }
}

module.exports = RoofTypeSchema
