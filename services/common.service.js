const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/app.config')

class CommonService {
    hashPassword(pw) {
        let password = {}

        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(pw, salt);


        password.salt = salt
        password.hash = hash

        return password
    }

    async chechkHash(pw, hash) {
        return bcrypt.compareSync(pw, hash)
    }

    generateToken(email) {
        let token = jwt.sign({email: email},
            config.jwtSecret,
            { expiresIn: '24h'}
        );

        return token
    }

    validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        }
        
        return false
    }
    
    //password between 7 to 15 characters which contain at least one numeric digit and a special character
    validatePassword(pw) {
        if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(pw)) { 
            return true;
        }
        
        return false;
    }
}

module.exports = new CommonService()