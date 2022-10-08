const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const middlewareAuth = require('../middlewares/auth');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/isAuthenticated', middlewareAuth.verifyToken ,userCtrl.register);
// router.get('/signout', userCtrl.signout);

module.exports = router