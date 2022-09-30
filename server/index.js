const cors = require('cors')
const bodyParser = require('body-parser')
const app = require('./src/app')
require("dotenv").config();

// const app = express()

// app.use(cors())
// app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// const db = require('./src/models/index')
// const Role = db.role


const port = process.env.PORT || 8080

