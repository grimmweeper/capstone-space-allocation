const express = require('express')

// use process.env variables to keep private variables,
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '12345',
    database : 'postgres',
    port : '5432'
  }
});

// Allow postgis queries
const knexPostgis = require('knex-postgis');
const st = knexPostgis(db);

// db.postgisDefineExtras((knex, formatter) => ({
//   utmzone(geom) {
//     return knex.raw('utmzone(?)', [formatter.wrapWKT(geom)]);
//   }
// }));

// Controllers - aka, the db queries
const main = require('./controllers/main')

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.get('/get', (req, res) => main.getTableData(req, res, db))
app.post('/post', (req, res) => main.postTableData(req, res, db))
app.put('/put', (req, res) => main.putTableData(req, res, db))
app.delete('/delete', (req, res) => main.deleteTableData(req, res, db))

app.get('/getHexagons', (req, res) => main.getHexagons(req, res, db, st))
app.get('/clearHexagons', (req, res) => main.clearHexagons(req, res, db))
// app.get('/allocateHexagons', (req, res) => main.allocateHexagons(req, res, db, st))
// app.post('/post', (req, res) => main.postTableData(req, res, db))
// app.post('/post', (req, res) => main.postTableData(req, res, db))
// app.post('/post', (req, res) => main.postTableData(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3001, () => {
  console.log(`app is running on port ${process.env.PORT || 3001}`)
})