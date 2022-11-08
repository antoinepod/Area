const axios = require('axios');
const cheerio = require('cheerio')

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

module.exports = {getChannelId};