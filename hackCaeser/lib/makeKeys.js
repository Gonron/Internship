const { ascii_letters } = require('./ascii')

/* STOPPED - JS heap ran out of memoery... can't do this assignment
 * 29^10 = 420.707.233.300.201 combinations....
 * OPTIONS:
 * - Might do something like this - 1. generate the key 2. test the key
 *   3. if wrong discard it 4. if correct keep the key and msg.
 *
 * - Callbacks/Promises/async_await
 */

function makeKeys() {
	let twoDigits = []
	let threeDigits = []
	let fourDigits = []
	let fiveDigits = []
	let sixDigits = []

	// two-digits
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			twoDigits.push(ascii_letters[i] + ascii_letters[j])
		}
	}
	console.log('two-digits:', twoDigits.length)
	// three-digits
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			for (let l = 0; l < ascii_letters.length; l++) {
				threeDigits.push(ascii_letters[i] + ascii_letters[j] + ascii_letters[l])
			}
		}
	}
	console.log('three-digits:', threeDigits.length)
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
	console.log('four-digits:', fourDigits.length)
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
	console.log('five-digits:', fiveDigits.length)
	for (let i = 0; i < ascii_letters.length; i++) {
		for (let j = 0; j < ascii_letters.length; j++) {
			for (let l = 0; l < ascii_letters.length; l++) {
				for (let k = 0; k < ascii_letters.length; k++) {
					for (let m = 0; m < ascii_letters.length; m++) {
						for (let n = 0; n < ascii_letters.length; n++) {
							sixDigits.push(
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
	console.log('six-digits:', sixDigits.length)
	// for (let i = 0; i < ascii_letters.length; i++) {
	// 	for (let j = 0; j < ascii_letters.length; j++) {
	// 		for (let l = 0; l < ascii_letters.length; l++) {
	// 			for (let k = 0; k < ascii_letters.length; k++) {
	// 				for (let m = 0; m < ascii_letters.length; m++) {
	// 					for (let n = 0; n < ascii_letters.length; n++) {
	// 						for (let o = 0; o < ascii_letters.length; o++) {
	// 							allKeys.push(
	// 								ascii_letters[i] +
	// 									ascii_letters[j] +
	// 									ascii_letters[l] +
	// 									ascii_letters[k] +
	// 									ascii_letters[m] +
	// 									ascii_letters[n] +
	// 									ascii_letters[o]
	// 							)
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	// console.log('seven-digits:', allKeys.length)
	// for (let i = 0; i < ascii_letters.length; i++) {
	// 	for (let j = 0; j < ascii_letters.length; j++) {
	// 		for (let l = 0; l < ascii_letters.length; l++) {
	// 			for (let k = 0; k < ascii_letters.length; k++) {
	// 				for (let m = 0; m < ascii_letters.length; m++) {
	// 					for (let n = 0; n < ascii_letters.length; n++) {
	// 						for (let o = 0; o < ascii_letters.length; o++) {
	// 							for (let p = 0; p < ascii_letters.length; p++) {
	// 								allKeys.push(
	// 									ascii_letters[i] +
	// 										ascii_letters[j] +
	// 										ascii_letters[l] +
	// 										ascii_letters[k] +
	// 										ascii_letters[m] +
	// 										ascii_letters[n] +
	// 										ascii_letters[o] +
	// 										ascii_letters[p]
	// 								)
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	// console.log('eight-digits:', allKeys.length)
	// for (let i = 0; i < ascii_letters.length; i++) {
	// 	for (let j = 0; j < ascii_letters.length; j++) {
	// 		for (let l = 0; l < ascii_letters.length; l++) {
	// 			for (let k = 0; k < ascii_letters.length; k++) {
	// 				for (let m = 0; m < ascii_letters.length; m++) {
	// 					for (let n = 0; n < ascii_letters.length; n++) {
	// 						for (let o = 0; o < ascii_letters.length; o++) {
	// 							for (let p = 0; p < ascii_letters.length; p++) {
	// 								for (let q = 0; q < ascii_letters.length; q++) {
	// 									allKeys.push(
	// 										ascii_letters[i] +
	// 											ascii_letters[j] +
	// 											ascii_letters[l] +
	// 											ascii_letters[k] +
	// 											ascii_letters[m] +
	// 											ascii_letters[n] +
	// 											ascii_letters[o] +
	// 											ascii_letters[p] +
	// 											ascii_letters[q]
	// 									)
	// 								}
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	// console.log('nine-digits:', allKeys.length)
	// for (let i = 0; i < ascii_letters.length; i++) {
	// 	for (let j = 0; j < ascii_letters.length; j++) {
	// 		for (let l = 0; l < ascii_letters.length; l++) {
	// 			for (let k = 0; k < ascii_letters.length; k++) {
	// 				for (let m = 0; m < ascii_letters.length; m++) {
	// 					for (let n = 0; n < ascii_letters.length; n++) {
	// 						for (let o = 0; o < ascii_letters.length; o++) {
	// 							for (let p = 0; p < ascii_letters.length; p++) {
	// 								for (let q = 0; q < ascii_letters.length; q++) {
	// 									for (let r = 0; r < ascii_letters.length; r++) {
	// 										allKeys.push(
	// 											ascii_letters[i] +
	// 												ascii_letters[j] +
	// 												ascii_letters[l] +
	// 												ascii_letters[k] +
	// 												ascii_letters[m] +
	// 												ascii_letters[n] +
	// 												ascii_letters[o] +
	// 												ascii_letters[p] +
	// 												ascii_letters[q] +
	// 												ascii_letters[r]
	// 										)
	// 									}
	// 								}
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	// console.log('ten-digits:', allKeys.length)
}

makeKeys()
