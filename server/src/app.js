const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require("passport")
const cookieParser = require('cookie-parser');
const session = require('express-session')
// const database = mongoose.connection;
// const { user } = require('./models/user.model');

const MONGO_URI = 'mongodb://mongo:27017/auth'
const port = process.env.PORT || 8080

const app = express()

const userRoutes = require('./routes/user');
const areaRoutes = require('./routes/area');
const actionRoutes = require('./routes/action');
const reactionRoutes = require('./routes/reaction');
const db = require("./models/index"); 

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


require("./strategies/jwtStrategy")
require("./strategies/localStrategies")
require("./strategies/googleStrategy")
require("./controllers/user")

app.use(bodyParser.json());

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
  secret: "akjjkjnisaiuu8998323jdkadsih892rhoisdfasl",
  resave: true,
  saveUninitialized: true,
  cookie: {
      maxAge: 60000
  }
}));

app.use(cors());
app.use(passport.initialize())


app.use('/api/auth', userRoutes);
app.use('/api/area', areaRoutes);
app.use('/api/action', actionRoutes);
app.use('/api/reaction', reactionRoutes);



mongoose.connect(MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion to MongoDB successful !'))
  .catch(error => console.log('error:', error));

app.get("/ping", (req, res) => {
  return res.send({
    error: false,
    message: "Server is healthy",
  });
});

app.get('/', (req, res) => {
    res.json(`Hello World!`)
})

app.get("/profile", (req, res) => {
  console.log(req);
  res.send("Welcome");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;