const axios = require("axios");
const utils = require("./utils");


exports.newVideo = async (req, res) => {
  const youtubeToken = process.env.YOUTUBE_TOKEN;
  const channelId = await utils.getChannelId(req.body.url);
  console.log("channelId = " + channelId);

  let int = setInterval(async () => {
    await axios
      .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${req.body.channelId}&maxResults=1&order=date&type=video&key=${youtubeToken}`)
      .then((response) => {
        console.log(response.data.items[0].id.videoId);
        // const obj = JSON.parse(json);
        if (id != 0 && response.data.items[0].id.videoId != id) {
          console.log("New video :" + response.data);
        }
        id = response.data.items[0].id.videoId;
        console.log(response.data.items[0].id.videoId);
        return res.status(201).json({"new_video": false, "data": response.data.items[0]});
      })
      .catch((err) => {
        console.log(err);
      });
  }, 30000);
};
