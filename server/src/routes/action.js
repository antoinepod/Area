const express = require('express')
const router = express.Router()
const youtube = require('../services/youtube/actions')

router.post('/youtube/newVideo', youtube.newVideo);

module.exports = router