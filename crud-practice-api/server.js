const express = require('express')
const app = express()
const PORT = 3000

// Using .env to keep database information private
require('dotenv').config()

// Middleware
const cors = require('cors')
/*
 * Here we can also make use of other middlewares,
 * such as morgan for logging.
 */

let db = require('knex')({
	client: 'pg',
	connection: {
		host: process.env.POSTGRES_HOST,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB
	}
})

// Queries
const main = require('./controllers/main')

// Enables All CORS Requests
app.use(cors())

// Routes
app.get('/', (req, res) => res.send('hello world'))
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}.`)
})
