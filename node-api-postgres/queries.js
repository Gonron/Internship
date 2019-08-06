require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD
})
const getUsers = (request, response) => {
	pool.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
		if (error) {
			throw error
		}
		response.status(200).json(result.rows)
	})
}

const getUserById = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
		if (error) {
			throw error
		}
		response.status(200).json(result.rows)
	})
}

const createUser = (request, response) => {
	const { name, email } = request.body

	pool.query(
		'INSERT INTO users (name, email) VALUES ($1, $2)',
		[name, email],
		(error, result) => {
			if (error) {
				throw error
			}
			// console.log(result)
			response.status(201).send('User added')
		}
	)
}

const updateUser = (request, response) => {
	const id = parseInt(request.params.id)
	const { name, email } = request.body

	pool.query(
		'UPDATE users SET name = $1, email = $2 WHERE id = $3',
		[name, email, id],
		(error, result) => {
			if (error) {
				throw error
			}
			response.status(200).send(`User modified with ID: ${id}`)
		}
	)
}

const deleteUser = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
		if (error) {
			throw error
		}
		response.status(200).send(`User deleted with ID: ${id}`)
	})
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
}
