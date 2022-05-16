const commonService = require('./common.service')
const logger = require('../config/logger.config')
const DB = require('../database/models/index.model').sequelize.models.User

class UserService {
    async createUser(user) {
        let newUser = user;
        let hash = await commonService.hashPassword(newUser.password)
        
        newUser['password'] = hash.hash;
        newUser["salt"] = hash.salt;
        newUser['latLoginAt'] = null
        // Using Promises like this versus async/await for easier error and logging 
        return new Promise((res, rej) => {
            return DB.create(newUser).then((user) => {
                // Replace this with actual logging
                logger.info(`User Auto-generated ID: ${user.id}`)
                return res(true)
            }).catch((err) => {
                //Replace this with actual logging
                logger.error(`User Service / Create User / Line 22: ${err}`)
                return rej(err)
            })
        })
    }  


    getUserByEmail(email) {
        return new Promise((res, rej) => {
            return DB.findOne({
                where: {
                    email
                }
            }).then((user) => {
                logger.info(`Get User By Email Called: ${user}`)
                return res(user)
            }).catch((err) => {
                logger.error(`User Service / Get User By Email / Line 39: ${err}`)
                return rej(err)
            })
        })
    }
}

module.exports = new UserService()