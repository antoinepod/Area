const axios = require("axios");
const cheerio = require('cheerio')


// exports.newVideo = async (req, res) => {
//   const youtubeToken = process.env.YOUTUBE_TOKEN;
//   const channelId = await utils.getChannelId(req.body.url);
//   console.log("channelId = " + channelId);

//   let int = setInterval(async () => {
//     await axios
//       .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${req.body.channelId}&maxResults=1&order=date&type=video&key=${youtubeToken}`)
//       .then((response) => {
//         console.log(response.data.items[0].id.videoId);
//         // const obj = JSON.parse(json);
//         if (id != 0 && response.data.items[0].id.videoId != id) {
//           console.log("New video :" + response.data);
//         }
//         id = response.data.items[0].id.videoId;
//         console.log(response.data.items[0].id.videoId);
//         return res.status(201).json({"new_video": false, "data": response.data.items[0]});
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, 30000);
// };

const parseData = (data) => {
  const tab = [];
  tab.push(data.items[0].snippet.channelTitle + " just uploaded a new video !");
  tab.push("");
  tab.push(data.items[0].snippet.title.replaceAll(`&#39;`, `'`));
  tab.push("");
  tab.push("https://www.youtube.com/watch?v=" + data.items[0].id.videoId);

  return tab.join("\n");
}

const checkUrl = (url) => url.indexOf('youtube.com') !== -1 || url.indexOf('youtu.be') !== -1

const getChannelId = async (url) => {
  if (checkUrl(url)) {
    const ytChannelPageResponse = await axios.get(url)
    const $ = cheerio.load(ytChannelPageResponse.data)

    const id = $('meta[itemprop="channelId"]').attr('content')
    if (id)
      return id;
    else
      console.log("'" + url + "' is not a YouTube url");
  } else
    console.log("Unable to get '" + url + "' channel id.");
}

exports.newVideo = async (req, res) => {
  const youtubeToken = process.env.YOUTUBE_TOKEN;
  const channelId = await getChannelId(req.body.url);

  await axios
    .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${youtubeToken}`)
    .then((response) => {
      const prev = req.body.previous;
      const current = parseData(response.data);
      if (prev !== undefined && prev !== "" && prev != current)
        return res.status(201).json({"changed": true, "data": current});
      else
        return res.status(200).json({"changed": false, "data": current});
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({"changed": false, "data": req.body.previous, "error": err});
    });
}
