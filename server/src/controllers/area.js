// const sendTelegramMessage = require("../services/telegram/reaction");
const dotenv = require("dotenv");
const axios = require("axios");
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
// exports.yougram =(async req, res) => {
//     setInterval (  () => {
//         await axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCBcWWjNbwwIAA8gEj2bpt3w&maxResults=1&order=date&type=video&key=AIzaSyBKEFcb3cuqMfK6hwt4oLYbg9Gaj7gruRw")
//         .then((response) => {
//             console.log(response.data.items[0].id.videoId);
//         });
//         // const obj = JSON.parse(json);
//         // if (obj.items[0].id.videoId != id) {
//         //     res.send("New video");
//         //     console.log("New video");
//         //     sendTelegramMessage(obj.items[0].id.videoId);
//         // }
//       }, 1000);     //when new video is published on youtube send a message to telegram
//       res.json("Hello World!");
//     };

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

// exports.yougram = (req, res) => {
//   let id = 0;

//   let int = setInterval(async () => {
//     await axios
//       .get(
//         `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${req.body.channelId}&maxResults=1&order=date&type=video&key=${}`
//       )
//       .then((response) => {
//         console.log(response.data.items[0].id.videoId);
//         id = response.data.items[0].id.videoId;
//         // clearInterval(int);
//         // const obj = JSON.parse(json);
//         if (response.data.items[0].id.videoId != id) {
//           res.send("New video");
//           console.log("New video");
//           sendTelegramMessage(response.data.items[0].id.videoId);
//         }
//       });
//   }, 10000); //when new video is published on youtube send a message to telegram
//   res.json("Hello World!");
// };
