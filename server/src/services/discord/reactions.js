const { Client, GatewayIntentBits } = require("discord.js");

const discordToken = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]
});

client.on("ready", () => {
  console.log('Discord is ready');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot)
    return;

  console.log("Discord message from " + message.author.tag + ": " + message.content)
  if (message.content.toLocaleLowerCase().startsWith('/getmyid')) 
    message.author.send(`Hello ${message.author}, your id is ${message.author.id}`);
});

client.login(process.env.DISCORD_TOKEN);


exports.messageInChannel = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var Guilds = client.guilds.cache.map(guild => guild.id);

  if (req.body.userId == undefined || req.body.userId == '')
    return res.status(400).json({ succes: false, error: 'Discord: Empty userId' });
  if (req.body.message == undefined || req.body.message == '')
    return res.status(400).json({ succes: false, error: 'Discord: Empty message' });

  Guilds.forEach(guild => {
    client.guilds.fetch(guild).then((v) => {
      var c = v.channels.cache.find(channel => channel.name === "général")
      if (c)
        c.send("<@" + req.body.userId + ">\n" + req.body.message)
    });
  });
  return res.status(200).json({ succes: true, result: 'Discord: Message sent in channel.' })
}

exports.sendPM = async (req, res) => {
  if (req.body.userId == undefined || req.body.userId == '')
    return res.status(400).json({ succes: false, error: 'Discord: Empty userId' });
  if (req.body.message == undefined || req.body.message == '')
    return res.status(400).json({ succes: false, error: 'Discord: Empty message' });
    
  client.users.fetch(req.body.userId, false)
    .then((user) => {
      user.send(req.body.message);
      return res.status(200).json({ succes: true, result: 'Discord: Private message sent.' });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ succes: false, result: 'Discord: Unknown user' });
    });
}