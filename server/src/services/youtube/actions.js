const axios = require("axios");
const cheerio = require('cheerio')

const youtubeToken = process.env.YOUTUBE_TOKEN;

const parseData = (data) => {
  const tab = [];
  tab.push("(YouTube)\n");
  tab.push(data.items[0].snippet.channelTitle + " just uploaded a new video !");
  tab.push("");
  tab.push(data.items[0].snippet.title.replaceAll(`&#39;`, `'`));
  tab.push("");
  tab.push("https://www.youtube.com/watch?v=" + data.items[0].id.videoId);

  return tab.join('\n');
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
  const channelId = await getChannelId(req.body.data);

  await axios
    .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${youtubeToken}`)
    .then((response) => {
      const prev = req.body.previous;
      const current = parseData(response.data);
      if (prev !== undefined && prev !== "" && prev != current)
        return res.status(201).json({"changed": true, "current": current});
      else
        return res.status(200).json({"changed": false, "current": current});
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({"changed": false, "current": req.body.previous, "error": err});
    });
}
