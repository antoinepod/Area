const sendTelegramMessage = require('../services/telegram/reaction');
const {newYouTubeVideo} = require('../services/youtube/action');

exports.yougram = (req, res) => {
   //when new video is published on youtube send a message to telegram
    var data = newYouTubeVideo();
    sendTelegramMessage("New video published on youtube", data);
};