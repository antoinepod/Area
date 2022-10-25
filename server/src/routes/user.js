const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const middlewareAuth = require('../middlewares/auth');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/isAuthenticated', middlewareAuth.verifyToken ,userCtrl.register);

module.exports = router