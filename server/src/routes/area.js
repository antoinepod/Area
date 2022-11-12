const express = require('express')
const router = express.Router()
const areaCtrl = require('../controllers/area')

router.post('/create', areaCtrl.create);
router.delete('/delete', areaCtrl.delete);
router.post('/update', areaCtrl.update);
router.get('/get', areaCtrl.get);



module.exports = router