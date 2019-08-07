const pg = require('pg')
const connectionString = require('./settings')

const client = new pg.Client(connectionString)
client.connect()

const sql = 'SELECT * FROM cars WHERE price > $1'
const values = [50000]

client
	.query(sql, values)
	.then(res => {
		const data = res.rows

		data.forEach(row => console.log(row))
	})
	.finally(() => {
		client.end()
	})
