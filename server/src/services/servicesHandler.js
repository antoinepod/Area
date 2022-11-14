const axios = require('axios');
const User = require("../models/user.model");

const url = "http://localhost:8080/api";

var usersTab = [];

var actionsMap = new Map();
actionsMap.set("Get last race results", "/f1/lastRace");
actionsMap.set("Get last qualifying results", "/f1/lastQualif");
actionsMap.set("Astronomy picture of the day is available", "/nasa/lastPicture");
actionsMap.set("It starts/stops freezing", "/weather/temperature");
actionsMap.set("It starts/stops raining", "/weather/weather");
actionsMap.set("The wind exceeds/drops below 80 km/h", "/weather/wind");
actionsMap.set("The sun rises/sets", "/weather/sun");
actionsMap.set("A youtuber posts a new video", "/youtube/newVideo");

var reactionsMap = new Map();
reactionsMap.set("Send a message in the general channel with your @", "/discord/messageInChannel");
reactionsMap.set("Send a message in the general channel and ping everyone", "/discord/messageEveryone");
reactionsMap.set("Send you a private message", "/discord/sendPM");
reactionsMap.set("Area's bot sends you a message", "/telegram/sendMessage");


const getUsers = async (req, res) => {
  User.find({}, (err, users) => {
    if (err)
      return console.log(err);
    users.map(user => {
      if (!usersTab.includes(user.username))
        usersTab.push(user.username);
    });
    console.log("usersTab:\n", usersTab);
  });
};

const handleReaction = async (reaction, action_data, last_action) => {
    console.log("handleReaction");
    await axios({
      method: 'post',
      url: url + "/reaction" + reactionsMap.get(reaction),
      data: {
        "userId": action_data,
        "message": last_action
      }
    });
};

const handleAction = async (user, areas) => {
  if (areas.length === 0)
    return;
  for (let area of areas) {
    if (area.status === true) {
      await axios({
        method: "get", url: url + "/action" + actionsMap.get(area.action),
        data: {"data": area.action_data, "previous": area.last_action}
      }).then(async (response) => {
        console.log("handleAction response:\n", response.data);
        await axios({
          method: "post", url: url + "/area/setLastAction",
          data: {"username": user, "_id": area._id, "last_action": response.data.current}
        }).then(() => {
          if (response.data.changed === true)
            handleReaction(area.reaction, area.reaction_data, response.data.current);
        }).catch((error) => {
          console.log("handleAction error:\n", error);
        });
      }).catch((error) => {
        console.log("handleAction error:\n", error);
      });
    }
  }
};

const executeAreas = async () => {
  getUsers();
  console.log("executeAreas");

  for (let user of usersTab) {
    console.log("user:", user);
    await axios({method: "post", url: url + "/area/get", data: {"username": user}})
      .then((response) => {
        console.log(response.data);
        if (response.data.success === true)
          handleAction(user, response.data.areas);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

exports.loop = async () => {
  await executeAreas();
  setInterval(executeAreas, 15000);
};