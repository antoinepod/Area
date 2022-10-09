const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const areaCtrl = require('../controllers/area')

router.post('/yougram', userCtrl.yougram);

module.exports = router