const express = require('express')
const router = express.Router()
const youtube = require('../services/youtube/actions')
const weather = require('../services/weather/actions')

router.post('/youtube/newVideo', youtube.newVideo);
router.post('/weather/temperature', weather.getTemperature);
router.post('/weather/weather', weather.getWeather);

module.exports = router