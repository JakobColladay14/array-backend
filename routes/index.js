// Routing Index
module.exports = function(app) {
    app.use('/api/auth', require('./auth.routes'))
}
