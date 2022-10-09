const dotenv = require("dotenv");
const localtunnel = require("localtunnel");
const YouTubeNotifier = require("youtube-notification");
const app = require("../app");
dotenv.config();

const port = 8080;

exports.newYouTubeVideo = (async (/*channelId*/) => {
  const tunnel = await localtunnel({ port: port });

  let datayt;
  let channelId = "UCBcWWjNbwwIAA8gEj2bpt3w";
  const baseUrl = tunnel.url;

  const notifier = new YouTubeNotifier({
    hubCallback: `${baseUrl}/youtube/notifications`,
  });

  app.use("/youtube/notifications", notifier.listener()); //change file of this fct

  notifier.subscribe(channelId);

  notifier.on("subscribe", (data) => {
    console.log("Subscribed");
    console.log(data);
  });

  notifier.on("notified", (data) => {
    console.log("New Video");
    console.log(data);
    datayt = data;
  });

  return datayt;
})();

// https://stackoverflow.com/questions/47965955/sending-direct-messages-from-nodejs-script-to-telegram
