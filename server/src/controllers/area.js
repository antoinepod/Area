// const sendTelegramMessage = require("../services/telegram/reaction");
const dotenv = require("dotenv");
const User = require("../models/user.model");
const axios = require("axios");
const { isObjectIdOrHexString } = require("mongoose");
const { mongoose } = require("../models");
dotenv.config();

const YOUTUBE_TOKEN ="AIzaSyCM-9yTtIDK3ViuEqF2YgotLZi2WeYKY4k"
const TELEGRAM_TOKEN="5626062224:AAEXno3mSU5Gh6ulnk1FG33epqYVstSC3p0"

const port = 8080;
function sendTelegramMessage (message) {
    const apiToken = process.env.TELEGRAM_TOKEN;
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=5263336723&text=${message}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };


exports.yougram =(req, res) => {
    let id = 0;

    let int = setInterval ( async () => {
        await axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCBcWWjNbwwIAA8gEj2bpt3w&maxResults=1&order=date&type=video&key=AIzaSyCM-9yTtIDK3ViuEqF2YgotLZi2WeYKY4k")
        .then((response) => {
            console.log(response.data.items[0].id.videoId);
            // const obj = JSON.parse(json);
            if (id != 0 && response.data.items[0].id.videoId != id) {
                res.send("New video");
                console.log("New video");
                sendTelegramMessage(response.data.items[0].id.videoId);
            };
            id = response.data.items[0].id.videoId;
        }).catch((err) => {
            console.log(err);
        });
      }, 60000);     //when new video is published on youtube send a message to telegram
    };


exports.create = async (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { $push: { areas: { _id: Date.now(), action: req.body.action, reaction: req.body.reaction, status: false } } },
    function(error, user) {
      if (!user)
        return res.status(404).json({ success: false, message: 'User not found' });
      else if (error)
        return res.status(404).json({ succes: false, message: 'Area not added', error })
      else
        return res.status(200).json({ success: true, message: 'Area added !', data: user })
    }
  );
};


exports.delete = async (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { $pull: { areas: { _id: req.body._id }}},
    function(error, area) {
      if (!area)
        return res.status(404).json({ success: false, message: 'Area not found' });
      else if (error)
        return res.status(404).json({area, success: false, message: 'User not updated', error })
      else
        return res.status(200).json({ success: true, message: 'Area deleted !', data: area })
    }
  );
};


exports.update = async (req, res) => {
  User.updateOne(
    { username: req.body.username, "areas._id": req.body._id },
    { $set: { "areas.$.status": req.body.status}},
    function(error, area) {
      if (!area)
        return res.status(404).json({ success: false, message: 'Area not found' });
      else if (error)
        return res.status(404).json({area, success: false, message: 'User not updated', error })
      else
        return res.status(200).json({ success: true, message: 'Area updated !', data: area })
    }
  );
};
