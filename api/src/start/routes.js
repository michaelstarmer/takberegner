'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'AppController.index');

Route.group(() => {
  Route.get('/login', 'AuthController.login').as('login');
  Route.post('/login', 'AuthController.login').as('login');
}).prefix('v1');

Route.group(() => {
  Route.get('/', 'RoofController.all').as('get.roofs.all');
  Route.post('/calculate/roof', 'RoofController.calculateRoof').as('post.calculate.roof');
  Route.post('/calculate/materials', 'RoofController.calculateMaterials').as('post.calculate.materials');
}).prefix('v1/roofs');

// Login
// Logout

// get projects
//