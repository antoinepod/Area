const express = require('express')
const app = express()
const port = 4000

const auth = require('./routes/auth');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.route('/register')
    .post(auth.register_post)

app.route('/login')
    .post(auth.login_post)