var express = require('express')
var path = require('path')
var config = require('./config/app.config')
var app = express()
const mysql = require('mysql2')


app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(express.static(path.join(__dirname, 'public')));
app.listen(config.port, () => console.log(`Server running on port ${config.port}`))

// Init app routes
require('./routes/index')(app)

// init db connection
require('./database/models/index.model') 


module.exports = app;
