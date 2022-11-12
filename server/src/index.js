const express = require('express')
const app = express()
const port = 4000

const auth = require('./routes/auth');

app.get('/', (req, res) => {
  res.send('Area API Entry Point')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
