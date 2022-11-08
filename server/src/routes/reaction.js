const express = require('express')
const router = express.Router()
const telegram = require('../services/telegram/reactions')

router.post('/telegram/sendMessage', telegram.sendMessage);


module.exports = router