const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const ip = require('ip');
// const database = mongoose.connection;
// const { user } = require('./models/user.model');

const MONGO_URI = "mongodb://mongo:27017/auth";
const port = process.env.PORT || 8080;

const app = express();

const userRoutes = require("./routes/user");
const areaRoutes = require("./routes/area");
const actionRoutes = require("./routes/action");
const reactionRoutes = require("./routes/reaction");
const db = require("./models/index");
const auth = require("./middlewares/auth");
// require("./src/strategies/jwtStrategy")
// require("./src/strategies/localStrategy")

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },

//   credentials: true,
// }

// app.use(cors(corsOptions))

require("./strategies/jwtStrategy");
require("./strategies/localStrategies");
require("./strategies/googleStrategy");
require("./controllers/user");

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: "akjjkjnisaiuu8998323jdkadsih892rhoisdfasl",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(auth);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", userRoutes);
app.use("/api/area", areaRoutes);
app.use("/api/action", actionRoutes);
app.use("/api/reaction", reactionRoutes);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion to MongoDB successful !"))
  .catch((error) => console.log("error:", error));

app.get("/ping", (req, res) => {
  return res.send({
    error: false,
    message: "Server is healthy",
  });
});

app.get("/", (req, res) => {
  res.json(`Hello World!`);
});

app.get("/profile", (req, res) => {
  console.log(req);
  res.send("Welcome");
});

app.get("/about.json", (req, res) => {
  res.json({
    client: {
      host: req.ip.split(":").pop(),
    },
    server: {
      current_time: new Date().getTime(),
      services: [
        {
          name: "youtube",
          actions: [
            {
              name: "getNewVideo",
              description: "Get the title of the last video uploaded from a given channel",
            },
          ],
        },
        {
          name: "nasa",
          actions: [
            {
              name: "getNasaPicture",
              description: "Get the picture of the day from NASA",
            },
          ]
        },
        {
          name: "weather",
          actions: [
            {
              name: "getFreezingWeather",
              description: "Get the weather when it starts/stops freezing of a given city",
            },
            {
              name: "getRainingWeather",
              description: "Get the weather when it starts/stops raining of a given city",
            },
            {
              name: "getDayNight",
              description: "Get if it is day/night of a given city",
            },
            {
              name: "getWindWeather",
              description: "Get when the wind is over 80km/h of a given city",
            },
          ]
        },
        {
          name: "discord",
          reactions: [
            {
              name: "sendDmDiscord",
              description: "receive a message from a bot",
            },
            {
              name: "sendPublicDm",
              description: "receive a message from a bot in the 'general' channel with your @username",
            },
            {
              name: "sendEveryoneDm",
              description: "receive a message from a bot in the 'general' channel with @everyone",
            },
          ],
        },
        {
          name: "telegram",
          reactions: [
            {
              name: "sendDmTelegram",
              description: "receive a message from a bot",
            }
          ]
        },
        {
          name: "f1",
          actions: [
            {
              name: "getRaceResults",
              description: "Get the results of the last race",
            },
            {
              name: "getRaceQualifyingResults",
              description: "Get the qualifying results of the last race",
            },
          ],
        },
      ],
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
