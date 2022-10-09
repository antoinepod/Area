const express = require('express')
const dotenv = require('dotenv')
const localtunnel = require('localtunnel')
const YouTubeNotifier = require('youtube-notification');
dotenv.config();


const app = express();
const port = 8080;


exports.newYouTubeVideo = (async () => {
  const tunnel = await localtunnel({ port: port });

  let channelId = 'UCBcWWjNbwwIAA8gEj2bpt3w';
  const baseUrl = tunnel.url;

  const notifier = new YouTubeNotifier({
      hubCallback: `${baseUrl}/youtube/notifications`,
  });
  
  app.use("/youtube/notifications", notifier.listener());
  
  app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`)
  
  })
  
  notifier.subscribe(channelId);
  
  notifier.on('subscribe', data => {
      console.log('Subscribed');
      console.log(data);
  });
  
  notifier.on('notified', data => {
      console.log('New Video');
      console.log(data);
})})();

// https://stackoverflow.com/questions/47965955/sending-direct-messages-from-nodejs-script-to-telegram