var express = require('express');
var router = express.Router();
let authController = require('../controllers/auth.controller')

// Auth Routes
// Example: router.get(url, middleware, controller)

router.post('/createUser', authController.createUser);
router.post('/login', authController.login);
router.post('/logout', authController.logout)


module.exports = router;