const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


const port = 8080

app.get('/', (req, res) => {
  res.send('hello World')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})