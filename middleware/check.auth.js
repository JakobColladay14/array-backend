let jwt = require('jsonwebtoken')
let config = require("../config/app.config")

let checkToken = (req, res, next) => {
    let token = req.headers['authorization']

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
    }

    console.log(token)

    if(token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if(err) {
                // Can add more errors 
                return res.json({
                    success: false,
                    message: 'Token is not valid',
                    code: 401
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.json({
            success: false,
            message: 'Auth Token is not supplied',
            code: 400
        })
    }
}

module.exports = {
    checkToken: checkToken
}