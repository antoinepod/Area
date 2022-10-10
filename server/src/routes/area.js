const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const areaCtrl = require('../controllers/area')

router.get('/yougram', areaCtrl.yougram);

module.exports = router