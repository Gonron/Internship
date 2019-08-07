const pg = require('pg')
const config = require('./settings')

const pool = new pg.Pool(config)

pool.connect().then(client => {
	return client
		.query('SELECT * FROM cars WHERE id = $1', [1])
		.then(res => {
			client.release()
			console.log(res.rows[0])
		})
		.catch(e => {
			client.release()
			console.log('Error:', e.stack)
		})
		.finally(() => pool.end())
})
