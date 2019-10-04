const { dbLogger, xmlLogger } = require('./winston/logger')

// dbLogger.log({
// 	level: 'error',
// 	message: 'Problems in the DB'
// })

let cvr = '80602022'
xmlLogger.log({
	level: 'warn',
	message: `Something went wrong with company: ${cvr}!`
})

// dbLogger.log({
// 	level: 'warn',
// 	message: 'Duplicates occured!'
// })

// xmlLogger.log({
// 	level: 'error',
// 	message: `Was unable to access xbrl for company: ${cvr}!`
// })
