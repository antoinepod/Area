const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

const botId = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(botId, {polling: true});

if (bot.isPolling())
  console.log('Telegram is ready');

bot.onText(RegExp(), (message) => {
  const chatId = message.chat.id;
  console.log("Telegram message from " + message.chat.username + ": " + message.text)

  if (message.text.toLocaleLowerCase().startsWith('/start')) 
    bot.sendMessage(chatId, `Hello ${message.chat.username}, please send /getmyid command to get your id.`);
  if (message.text.toLocaleLowerCase().startsWith('/getmyid')) 
    bot.sendMessage(chatId, `Hello ${message.chat.username}, your id is ${message.chat.id}`);
});

exports.sendMessage = async (req, res) => {
  if (req.body.userId == undefined || req.body.userId == '')
    return res.status(400).json({ succes: false, error: 'Telegram: Empty userId' });
  if (req.body.message == undefined || req.body.message == '')
    return res.status(400).json({ succes: false, error: 'Telegram: Empty message' });

  const message = req.body.message.replaceAll('\n', '%0A');
  await axios.get(`https://api.telegram.org/bot${botId}/sendMessage?chat_id=${req.body.userId}&text=${message}`)
    .then(() => {
      return res.status(200).json({"success": true, "message": {"chatId": req.body.chatId, "message": req.body.message}});
    })
    .catch((error) => {
      return res.status(500).json({"success": false, "error": error});
    });
};

