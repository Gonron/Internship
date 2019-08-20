const { ascii, ascii_letters } = require('./lib/ascii')
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

// Can't test this without a list of all keys - check ./makeKeys
function decrypt(msg, keyList) {
	for (let k = 0; k < keyList.length; k++) {
		let decryptedMessage = ''
		keyTarget = ascii_letters.indexOf(keyList[k % keyList.length])
		for (let i = 0; i < msg.length; i++) {
			target = ascii.indexOf(msg[i])
			if (target - k < 0) {
				target = target + ascii.length
			}
			decryptedMessage += ascii[target - k]
		}
		console.log('Key #' + keyList[k] + ':', decryptedMessage)
	}
}

// console.log(decrypt("'HLbOHFbFLIb/%1c", allKeys))
