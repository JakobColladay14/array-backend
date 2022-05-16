var express = require('express');
var router = express.Router();
let authController = require('../controllers/auth.controller')

// This route is for the purpose of checking authentication after being logged in
router.get('/checkingAuth', authController.checkingAuth);

module.exports = router;