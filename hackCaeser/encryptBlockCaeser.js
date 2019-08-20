const { ascii, ascii_letters } = require('./ascii')
let message =
	'"Hvor dog verden er stor!" sagde alle ungerne; thi de havde nu rigtignok ganske anderledes plads, end da de lå inde i ægget.'

function encrypt(msg, key) {
	let encryptedMessage = ''

	for (let i = 0; i < msg.length; i++) {
		// Finds the value of the key string
		keyTarget = ascii.indexOf(key[i % key.length])

		// finds the value of the msg letter
		target = ascii.indexOf(msg[i])

		// encrypts the message and adds it to the res list
		encryptedMessage += ascii[(target + keyTarget) % ascii.length]
	}

	return encryptedMessage
}

// console.log(encrypt(message, '*!%&Ma!_(}'))

/* --------------------------------------------------------------------------------- */

function encrypt_02(msg, key) {
	let encryptedMessage = ''

	for (let i = 0; i < msg.length; i++) {
		// Finds the value of the key string
		keyTarget = ascii_letters.indexOf(key[i % key.length])

		// finds the value of the msg letter
		target = ascii.indexOf(msg[i])

		// encrypts the message and adds it to the res list
		encryptedMessage += ascii[(target + keyTarget + 1) % ascii.length]
	}

	return encryptedMessage
}

console.log(encrypt_02(message, 'abxæø'))
