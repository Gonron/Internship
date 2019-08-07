const pg = require('pg')
const connectionString = require('./settings')

const client = new pg.Client(connectionString)
client.connect()

client
	.query('SELECT * FROM cars')
	.then(res => {
		const fields = res.fields.map(field => field.name)

		console.log(fields)
	})
	.catch(err => {
		console.log(err.stack)
	})
	.finally(() => {
		client.end()
	})
