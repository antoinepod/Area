const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser')


// const database = mongoose.connection;
// const { user } = require('./models/user.model');

const MONGO_URI = 'mongodb://mongo:27017/test'
const port = process.env.PORT || 8080

const app = express()

const userRoutes = require('./routes/user');
const areaRoutes = require('./routes/area');
const db = require("./models/index"); 

app.use(cors())
app.use(bodyParser.json());
app.use('/api/auth', userRoutes);
app.use('/api/area', areaRoutes);

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


module.exports = app;