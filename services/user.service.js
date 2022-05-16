const commonService = require('./common.service')

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
                console.log("User Auto-generated ID", user.id)
                return res(true)
            }).catch((err) => {
                //Replace this with actual logging
                console.log('User Service / Create User / Line 68', err)
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
                console.log(user)
                return res(user)
            }).catch((err) => {
                console.log('User Service / Get User By email/ Line 30', err)
                return rej(err)
            })
        })
    }
}

module.exports = new UserService()