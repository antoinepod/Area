const express = require('express')
const router = express.Router()
const youtube = require('../services/youtube/actions')
const weather = require('../services/weather/actions')
const f1 = require('../services/f1/actions')
const nasa = require('../services/nasa/actions')

router.get('/f1/lastRace', f1.getLastRace);
router.get('/f1/lastQualif', f1.getLastQualif);
router.get('/nasa/lastPicture', nasa.getLastPicture);
router.get('/weather/temperature', weather.getTemperature);
router.get('/weather/weather', weather.getWeather);
router.get('/weather/wind', weather.getWind);
router.get('/weather/sun', weather.getSun);
router.get('/youtube/newVideo', youtube.newVideo);


module.exports = router