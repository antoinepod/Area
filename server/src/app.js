const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express()

const port = process.env.PORT || 8080

const userRoutes = require('./routes/user')



mongoose.connect(`mongodb+srv://test:area123@atlascluster.jpsue9f.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion to MongoDB successful !'))
  .catch(error => console.log('error:', error));


app.get('/', (req, res) => {
    res.send(`mongodb+srv://William:${process.env.MONGODB_PASSWORD}@atlascluster.jpsue9f.mongodb.net/?retryWrites=true&w=majority`)
})
  
app.use('/api/auth', userRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  
module.exports = app;