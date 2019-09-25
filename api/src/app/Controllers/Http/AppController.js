'use strict'

class AppController {

  async index({ response }) {
    return response.json({ success: true, msg: "API is running." });
  }

}

module.exports = AppController
