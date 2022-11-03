const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const areaCtrl = require('../controllers/area')

router.get('/yougram', areaCtrl.yougram);

router.post('/create', areaCtrl.create);
router.delete('/delete', areaCtrl.delete);
router.post('/update', areaCtrl.update);

module.exports = router