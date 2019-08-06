const getTableData = (req, res, db) => {
	db.select('*')
		.from('testtable1')
		.then(items => {
			if (items.length) {
				res.json(items)
			} else {
				res.json({ dataExists: 'false' })
			}
		})
		.catch(err => res.status(400).json({ dbError: 'db error' }))
}

const postTableData = (req, res, db) => {
	const { firstname, lastname, email, phone, location } = req.body
	db('testtable1')
		.insert({ firstname, lastname, email, phone, location })
		.returning('*')
		.then(item => {
			res.json(item)
		})
		.catch(err => res.status(400).json({ dbError: 'db error' }))
}

const putTableData = (req, res, db) => {
	const { id, firstname, lastname, email, phone, location } = req.body
	db('testtable1')
		.where({ id })
		.update({ firstname, lastname, email, phone, location })
		.returning('*')
		.then(item => {
			res.json(item)
		})
		.catch(err => res.status(400).json({ dbError: 'db error' }))
}

const deleteTableData = (req, res, db) => {
	const { id } = req.body
	db('testtable1')
		.where({ id })
		.del()
		.then(item => {
			res.json(item)
		})
		.catch(err => res.status(400).json({ dbError: 'db error' }))
}

module.exports = {
	getTableData,
	postTableData,
	putTableData,
	deleteTableData
}
