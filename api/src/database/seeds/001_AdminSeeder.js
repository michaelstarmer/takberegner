'use strict'

/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User')
const path = require('path');

const scriptName = path.basename(__filename);

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    const userObj = {
      username: `mp1${Math.ceil(Math.random() * 100)}`,
      email: `michael@ways.asd${Math.round(Math.random() * 100)}`,
      password: 'test'
    };
    const user = await User.create(userObj);
    console.log(`User: ${user.email} with id: ${user.id} created with password: ${userObj.password}`);
  }
}

module.exports = UserSeeder
