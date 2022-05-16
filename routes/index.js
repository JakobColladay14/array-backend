const { checkToken } = require('../middleware/check.auth')

// Routing Index
module.exports = function(app) {
    app.use('/api/auth', require('./auth.routes'))
    app.use('/api/test', checkToken, require('./test.routes'))
}
