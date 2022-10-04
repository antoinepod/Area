const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser')
const MONGO_URI = 'mongodb://mongo:27017/test'

const app = express()
app.use(cors())

const port = process.env.PORT || 8080

// const userRoutes = require('./routes/user');
// const { user } = require('./models/user.model');

// const db = require("./src/models");


mongoose.connect(MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion to MongoDB successful !'))
  .catch(error => console.log('error:', error));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("MongoDB database connection established successfully");
});


app.get('/', (req, res) => {
    res.json(`Hello World!`)
})
  
// app.use('/api/auth', userRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;