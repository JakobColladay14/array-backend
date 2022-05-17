const {login, logout, isLoggedIn} = require('../middleware/user.map.service')
const commonService = require('../services/common.service')
const userService = require('../services/user.service')

class AuthController {

    async createUser(req, res) {
        // Guard to check if email / password exist
        if (!req.body.email || !req.body.password) {
            return res.json('Password or Email is not filled in')
        }

        // Validation Check, is Email Valid ? is Password Valid ?
        // Normally would prefer to do this on the client side but not an option for this
        if(!commonService.validateEmail(req.body.email) || !commonService.validatePassword(req.body.password)) {
            return res.json("Password or Email is invalid")
        }

        // Is email already used ? If true returns the user, if false returns null
        const email = await userService.getUserByEmail(req.body.email)
        if (email) {
            return res.json('This email already exists')
        }
        
        //Pass user creation logic to the service. Either returns true or an error
        const user = await userService.createUser(req.body)

        // Return either true or an error if true Client would then redirect user to login else show error 
        return res.json(user)
    }

    async login(req, res) {
        let { email } = req.body;
        let { password } = req.body;

        // Grab user by email
        let user = await userService.getUserByEmail(email);
        
        // Failed to find a user
        if (!user) {
            return res.json({ code: 401, user: null})
        }

        //Checks if the user is already logged in
        if (isLoggedIn(user.id)) {
            return res.json({ code: 401, msg: "User is already logged in"})
        }

        // compare user hash to password
        let didLoginSucceed = await commonService.chechkHash(password, user.password);

        if (!didLoginSucceed) {
            return res.json({ code: 401, user: null})
        }

        //Add user to the user map keeping track of who is logged in
        await login(user.id)

        return res.json({ code: 200, user: user})
    }

    async logout(req, res) {
        let userId = req.body.id

        let didLogout = await logout(userId)
        
        if (!didLogout) {
            return res.json({code: 401, msg: "This user is not logged in"})    
        }

        return res.json({code: 200, msg: 'Successfully logged out'})
    }

}
module.exports = new AuthController()