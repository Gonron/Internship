// const winston = require('winston')

// const logger = winston.createLogger({
// 	transports: [
// 		// new winston.transports.Console(),
// 		new winston.transports.File({ filename: 'error.log', level: 'error' }),
// 		new winston.transports.File({ filename: 'combined.log' })
// 	]
// })

// logger.log({
// 	level: 'info',
// 	message: 'Im inside the combined log'
// })

// logger.log({
// 	level: 'error',
// 	message: 'Im inside the error log'
// })

// const info = {
// 	level: 'info',
// 	message: 'Hey! Log something?'
// }

// const { level, message, ...meta } = info

const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] (${level}): ${message}`
})

const dbLogger = createLogger({
	format: combine(label({ label: 'DB' }), timestamp(), myFormat),
	transports: [
		new transports.File({ filename: 'winston/logs/db.log' }),
		new transports.File({ filename: 'winston/logs/error.log', level: 'error' }),
		new transports.File({ filename: 'winston/logs/combined.log' })
	]
})
const xmlLogger = createLogger({
	format: combine(label({ label: 'XMLReader' }), timestamp(), myFormat),
	transports: [
		new transports.File({ filename: 'winston/logs/xml.log' }),
		new transports.File({ filename: 'winston/logs/error.log', level: 'error' }),
		new transports.File({ filename: 'winston/logs/combined.log' })
	]
})

module.exports = { dbLogger, xmlLogger }
