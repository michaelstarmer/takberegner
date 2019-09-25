'use strict'

const User = use('App/Models/User')

class AuthController {

  async login({ request, response, auth }) {
    
    const { email, password } = request.all();
    
    console.log("Request values:", email, password);
    
    try {
      if (await auth.attempt(email, password)) {
        const user = await User.findBy('email', email);
        const accessToken = await auth.generate(user);

        return response.json({ user, token: accessToken });
      }
    } catch (error) {
      return response.json({ success: false, error });
    }
  }

}

module.exports = AuthController
