const axios = require('axios');


exports.sendMessage = async (req, res) => {
  const botId = process.env.TELEGRAM_TOKEN;

  await axios.get(`https://api.telegram.org/bot${botId}/sendMessage?chat_id=${req.body.chatId}&text=${req.body.message}`)
    .then(() => {
      return res.status(200).json({"success": true, "message": {"chatId": req.body.chatId, "message": req.body.message}});
    })
    .catch((error) => {
      return res.status(500).json({"success": false, "error": error});
    });
};

