const pg = require('pg')
const R = require('ramda')
const connectionString = require('./settings')

async function fetchNow() {
	const client = new pg.Client(connectionString)

	try {
		await client.connect()

		let result = await client.query('SELECT now()')
		return R.prop('now', R.head(result.rows))
	} finally {
		client.end()
	}
}

fetchNow().then(now => console.log(now))
