const axios = require('axios');

const port = process.env.PORT || 8080;

require("dotenv").config();
// 5626062224:AAEXno3mSU5Gh6ulnk1FG33epqYVstSC3p0"


// ajouter le chat id en paramètre

// exports.sendTelegramMessage = (message) => {
//   const apiToken = process.env.TELEGRAM_TOKEN;
//   const url = `https://api.telegram.org/bot5626062224:AAEXno3mSU5Gh6ulnk1FG33epqYVstSC3p0/sendMessage?chat_id=5626062224&text=${message}`;
//   axios
//     .get(url)
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };