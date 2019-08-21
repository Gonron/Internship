const { ascii, ascii_letters } = require('./lib/ascii')
const now = require('performance-now')
let encryptedMessage =
	',Iæu=aeNo}}fwj0P!Dz}åutxNc!Rienf%g7Nf_ålqfwt0ø!Spg*ej&3CwCm}xv%x4IuHolyl%m,PtJm}koik=NfCmq*qqg/U-_mln!igMFf_tæ*jsj0aj_!eqfy4'
let encryptedMessage02 = `#J,(,!f% <wg(|~o"å+<tv%+=#")ø!eg8ø&mg8.(hg('~<"*!#!få;"bxø}<ow8+#hv~ (pm8 åou!}<bpø},mgø}-!r"ø}t.8}(e"øø<eg8%7!k$|~!k84!hg*I`

/*
 * Notes:
 *  - The decrypt_NOT_OPTIMAL function is not optimal, hence the name, since it dosn't "hack" the encryptedMessage
 *    here i simple just decode it, with the given key
 *
 *  - To get the OPTIMAL function, i need it to loop over all the different combinations the ascii-alphabet can make (101 chars) to make a string that has 2-10 chars.
 *    Fun fact: with 10 chars, theres a total of 1,e+101 combinations 10^101
 */

function decrypt_NOT_OPTIMAL(msg, key) {
	let decryptedMessage = ''
	for (let i = 0; i < msg.length; i++) {
		keyTarget = ascii.indexOf(key[i % key.length])
		target = ascii.indexOf(msg[i])

		// wrap-around - if the target - the key is less then 0, it refresses the target
		// by adding the length of the aplhabet to it - similar to %-method, but instead works in the other direction
		if (target - keyTarget < 0) {
			target = target + ascii.length
		}
		decryptedMessage += ascii[target - keyTarget]
	}
	return decryptedMessage
}

// console.log(decrypt_NOT_OPTIMAL(encryptedMessage, '*!%&Ma!_(}'))

/* --------------------------------------------------------------------------------------------------------- */
/* Using the ascii_letters on the key propety */

function decrypt_NOT_OPTIMAL_02(msg, key) {
	let decryptedMessage = ''
	for (let i = 0; i < msg.length; i++) {
		keyTarget = ascii_letters.indexOf(key[i % key.length])
		target = ascii.indexOf(msg[i])

		// wrap-around - if the target - the key is less then 0, it refresses the target
		// by adding the length of the aplhabet to it - similar to %-method, but instead works in the other direction
		// console.log(keyTarget)
		if (target - keyTarget < 0) {
			target = target + ascii.length
		}
		decryptedMessage += ascii[target - keyTarget - 1]
	}
	return decryptedMessage
}

// console.log(decrypt_NOT_OPTIMAL_02(encryptedMessage02, 'abxæø'))

/* --------------------------------------------------------------------------------------------------------- */
/* PLAYGROUND */

function decrypt(msg, key) {
	let decryptedMessage = ''
	for (let i = 0; i < msg.length; i++) {
		keyTarget = ascii_letters.indexOf(key[i % key.length])
		target = ascii.indexOf(msg[i])
		if (target - keyTarget < 0) {
			target = target + ascii.length
		}
		decryptedMessage += ascii[target - keyTarget]
	}
	console.log('Key #' + key + ':', decryptedMessage)
}

function keyHandler(msg, keyList) {
	for (let k = 0; k < keyList.length; k++) {
		decrypt(msg, keyList[k])
	}
}

// NOTE: this will take roughly 2.5 sec
const twoDigitMessage =
	'Mqsgn"Jrtwn"ju!ujoqnz"ewnoz"ugyv!qg"ujf"qtjpukoi!cof!vzrfufvukoi!kofvuutz0!Nptfo!Kquvo!jbu!dfgo"ujf"jpewtvsæ(u!uucofbte"ewnoz"ugyv!gwgs"tkoef"ujf"2712t'
// let start = now()
// keyHandler(twoDigitMessage, makeKeysTwo())
// let end = now()
// console.log('twoDigit decryption took ' + (end - start) / 1000 + ' secounds.')

function makeKeysTwo() {
	let twoDigits = []
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			twoDigits.push(ascii_letters[i] + ascii_letters[j])
		}
	}
	return twoDigits
}

/* --------------------------------------------------------------------------------------------------------- */

// NOTE: this will take roughly 52 sec
const threeDigitMessage =
	'"Kgg!xim"dpi mkghg q| egt!niev fpdow!#"sbidf"aofeo= #jas"jfi ow mkghgt!uå!næoie-"s{"kbp kgg!nihie!fysghbxsukdfp ngd"$'
// let start = now()
// keyHandler(threeDigitMessage, makeKeysThree())
// let end = now()
// console.log('threeDigit decryption took ' + (end - start) / 1000 + ' secounds.')

function makeKeysThree() {
	let threeDigits = []
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			for (let l = 0; l < ascii_letters.length; l++) {
				threeDigits.push(ascii_letters[i] + ascii_letters[j] + ascii_letters[l])
			}
		}
	}
	return threeDigits
}

/* --------------------------------------------------------------------------------------------------------- */

// NOTE: this will take roughly 11 mins
const fourDigitMessage = '>oær<-å !)d!><sa!}e }~n !åml~<an}H o!<så<!ik<"unJ'
// let start = now()
// keyHandler(fourDigitMessage, makeKeysFour())
// let end = now()
// console.log('fourDigit decryption took ' + (end - start) / 1000 / 60 + ' minutes.')

function makeKeysFour() {
	let fourDigits = []
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			for (let l = 0; l < ascii_letters.length; l++) {
				for (let k = 0; k < ascii_letters.length; k++) {
					fourDigits.push(
						ascii_letters[i] + ascii_letters[j] + ascii_letters[l] + ascii_letters[k]
					)
				}
			}
		}
	}
	return fourDigits
}

/* --------------------------------------------------------------------------------------------------------- */

// NOTE: this will take roughly 5.3 hours
const fiveDigitMessage = `>cå<s7<-%a&<}/ #%%~ "å0~ '~(#n!H<(å,< )r(/ .i!~< o&%<.a&~,="`
let start = now()
keyHandler(fiveDigitMessage, makeKeysFive())
let end = now()
console.log('fiveDigit decryption took ' + (end - start) / 1000 / 60 + ' minutes.')

function makeKeysFive() {
	let fiveDigits = []
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			for (let l = 0; l < ascii_letters.length; l++) {
				for (let k = 0; k < ascii_letters.length; k++) {
					for (let m = 0; m < ascii_letters.length; m++) {
						fiveDigits.push(
							ascii_letters[i] +
								ascii_letters[j] +
								ascii_letters[l] +
								ascii_letters[k] +
								ascii_letters[m]
						)
					}
				}
			}
		}
	}
	return fiveDigits
}
