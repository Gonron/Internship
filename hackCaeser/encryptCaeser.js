const { ascii } = require('./lib/ascii')
let message =
	'"Hvor dog verden er stor!" sagde alle ungerne; thi de havde nu rigtignok ganske anderledes plads, end da de lå inde i ægget.'

function encrypt(msg, n) {
	let encryptedMessage = ''

	for (let i = 0; i < msg.length; i++) {
		target = ascii.indexOf(msg[i])
		encryptedMessage += ascii[(target + n) % 101]
	}
	return encryptedMessage
}

console.log(
	encrypt(
		'Men den stakkels ælling, som sidst var kommet ud af ægget, og så så fæl ud, blev bidt, puffet og gjort nar af, og det både af ænderne og hønsene. "Han er for stor!" sagde de alle sammen, og den kalkunske hane, der var født med sporer og troede derfor, at han var en kejser, pustede sig op som et fartøj for fulde sejl, gik lige ind på ham og så pludrede den og blev ganske rød i hovedet. Den stakkels ælling vidste hverken, hvor den turde stå eller gå, den var så bedrøvet, fordi den så så styg ud og var til spot for hele andegården.',
		5
	)
)
