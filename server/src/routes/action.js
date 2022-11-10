const express = require('express')
const router = express.Router()
const youtube = require('../services/youtube/actions')
const weather = require('../services/weather/actions')
const f1 = require('../services/f1/actions')

router.post('/youtube/newVideo', youtube.newVideo);
router.post('/weather/temperature', weather.getTemperature);
router.post('/weather/weather', weather.getWeather);
router.post('/f1/lastRace', f1.getLastRace);


module.exports = router