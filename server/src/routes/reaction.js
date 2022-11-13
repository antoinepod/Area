const express = require('express')
const router = express.Router()
const telegram = require('../services/telegram/reactions')
const discord = require('../services/discord/reactions')

router.post('/discord/messageInChannel', discord.messageInChannel);
router.post('/discord/messageEveryone', discord.messageEveryone);
router.post('/discord/sendPM', discord.sendPM);
router.post('/telegram/sendMessage', telegram.sendMessage);



module.exports = router