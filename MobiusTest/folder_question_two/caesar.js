alphabet = require('./alphabet')

/* TODOs: Fix the issue, where if it reaches the last element, start from the beginning
 * 		  Find a better way to remove spaces?
 *        Add other chars to the alphabet - (,.-*^) etc.
 * 		  Find a PROPER list of all the ascii chars
 */

function ceasarEncryption(word, n) {
	res = []

	for (let i = 0; i < word.length; i++) {
		target = alphabet.indexOf(word[i])
		res.push(alphabet[target + n])
	}
	return res
}

function ceasarDecryption(word, n) {
	res = []

	for (let i = 0; i < word.length; i++) {
		target = alphabet.indexOf(word[i])
		res.push(alphabet[target - n])
	}
	return res
}

console.log(ceasarEncryption('Hej med dig, Fætter Bims!', 2))
// console.log(ceasarDecryption('cccc', 2))

// NOTES - Won't be able to get the correct results from the test before all of the above TODOs have been fixed.
