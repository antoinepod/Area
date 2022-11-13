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
const servicesHandler = require("./services/servicesHandler");

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

app.use(bodyParser.json());

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    secret: "akjjkjnisaiuu8998323jdkadsih892rhoisdfasl",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(cors());
app.use(passport.initialize());

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
      host: req.ip,
      host1: ip.address(),
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
              name: "getWeather",
              description: "Get the weather of a given city",
            },
            {
              name: "getWeatherForecast",
              description: "Get the weather forecast of a given city",
            },
            {
              name: "getWeatherForecastByDay",
              description: "Get the weather forecast of a given city for a given day",
            }
          ]
        },
        {
          name: "twitter",
          reactions: [
            {
              name: "sendDm",
              description: "receive a direct message to a given user",
            },
          ],
        },
        {
          name: "telegram",
          description: "receive a message to a given user",
        },
        {
          name: "f1",
          actions: [
            {
              name: "getRaceResults",
              description: "Get the results of the last race",
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

servicesHandler.loop();

module.exports = app;
