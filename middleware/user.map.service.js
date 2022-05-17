
// Can add different data to this as well
let userMap = new Map()

const logout = (id) => {
        let userId = parseInt(id)
        
        if (userMap.get(userId)) {
            userMap.delete(userId)
            return true
        } else {
            return false
        }
    }

const login = (id) => {
    return userMap.set(id, Date.now())
}

const isLoggedIn = (id) => {
        return userMap.has(id)
}


module.exports = {logout, login, isLoggedIn}