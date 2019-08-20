const { ascii, ascii_letters } = require('./ascii')
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

let allKeys = []
// STOPPED - JS heap ran out of memoery... can't do this assignment
function makeKeys() {
	let min = 2
	let max = 10

	// two-digits
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			allKeys.push(ascii_letters[i] + ascii_letters[j])
		}
	}
	console.log('two-digits:', allKeys.length)
	// three-digits
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			for (let l = 0; l < ascii_letters.length; l++) {
				allKeys.push(ascii_letters[i] + ascii_letters[j] + ascii_letters[l])
			}
		}
	}
	console.log('three-digits:', allKeys.length)
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			for (let l = 0; l < ascii_letters.length; l++) {
				for (let k = 0; k < ascii_letters.length; k++) {
					allKeys.push(
						ascii_letters[i] + ascii_letters[j] + ascii_letters[l] + ascii_letters[k]
					)
				}
			}
		}
	}
	console.log('four-digits:', allKeys.length)
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			for (let l = 0; l < ascii_letters.length; l++) {
				for (let k = 0; k < ascii_letters.length; k++) {
					for (let m = 0; m < ascii_letters.length; m++) {
						allKeys.push(
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
	console.log('five-digits:', allKeys.length)
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			for (let l = 0; l < ascii_letters.length; l++) {
				for (let k = 0; k < ascii_letters.length; k++) {
					for (let m = 0; m < ascii_letters.length; m++) {
						for (let n = 0; n < ascii_letters.length; n++) {
							allKeys.push(
								ascii_letters[i] +
									ascii_letters[j] +
									ascii_letters[l] +
									ascii_letters[k] +
									ascii_letters[m] +
									ascii_letters[n]
							)
						}
					}
				}
			}
		}
	}
	console.log('six-digits:', allKeys.length)
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			for (let l = 0; l < ascii_letters.length; l++) {
				for (let k = 0; k < ascii_letters.length; k++) {
					for (let m = 0; m < ascii_letters.length; m++) {
						for (let n = 0; n < ascii_letters.length; n++) {
							for (let o = 0; o < ascii_letters.length; o++) {
								allKeys.push(
									ascii_letters[i] +
										ascii_letters[j] +
										ascii_letters[l] +
										ascii_letters[k] +
										ascii_letters[m] +
										ascii_letters[n] +
										ascii_letters[o]
								)
							}
						}
					}
				}
			}
		}
	}
	console.log('seven-digits:', allKeys.length)
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			for (let l = 0; l < ascii_letters.length; l++) {
				for (let k = 0; k < ascii_letters.length; k++) {
					for (let m = 0; m < ascii_letters.length; m++) {
						for (let n = 0; n < ascii_letters.length; n++) {
							for (let o = 0; o < ascii_letters.length; o++) {
								for (let p = 0; p < ascii_letters.length; p++) {
									allKeys.push(
										ascii_letters[i] +
											ascii_letters[j] +
											ascii_letters[l] +
											ascii_letters[k] +
											ascii_letters[m] +
											ascii_letters[n] +
											ascii_letters[o] +
											ascii_letters[p]
									)
								}
							}
						}
					}
				}
			}
		}
	}
	console.log('eight-digits:', allKeys.length)
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			for (let l = 0; l < ascii_letters.length; l++) {
				for (let k = 0; k < ascii_letters.length; k++) {
					for (let m = 0; m < ascii_letters.length; m++) {
						for (let n = 0; n < ascii_letters.length; n++) {
							for (let o = 0; o < ascii_letters.length; o++) {
								for (let p = 0; p < ascii_letters.length; p++) {
									for (let q = 0; q < ascii_letters.length; q++) {
										allKeys.push(
											ascii_letters[i] +
												ascii_letters[j] +
												ascii_letters[l] +
												ascii_letters[k] +
												ascii_letters[m] +
												ascii_letters[n] +
												ascii_letters[o] +
												ascii_letters[p] +
												ascii_letters[q]
										)
									}
								}
							}
						}
					}
				}
			}
		}
	}
	console.log('nine-digits:', allKeys.length)
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			for (let l = 0; l < ascii_letters.length; l++) {
				for (let k = 0; k < ascii_letters.length; k++) {
					for (let m = 0; m < ascii_letters.length; m++) {
						for (let n = 0; n < ascii_letters.length; n++) {
							for (let o = 0; o < ascii_letters.length; o++) {
								for (let p = 0; p < ascii_letters.length; p++) {
									for (let q = 0; q < ascii_letters.length; q++) {
										for (let r = 0; r < ascii_letters.length; r++) {
											allKeys.push(
												ascii_letters[i] +
													ascii_letters[j] +
													ascii_letters[l] +
													ascii_letters[k] +
													ascii_letters[m] +
													ascii_letters[n] +
													ascii_letters[o] +
													ascii_letters[p] +
													ascii_letters[q] +
													ascii_letters[r]
											)
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	console.log('ten-digits:', allKeys.length)
}

makeKeys()

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
