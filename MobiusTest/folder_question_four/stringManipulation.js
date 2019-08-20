/* TODOs
 * Find the highest number of the accured values...
 *
 *
 *
 */

let numbersList = []
let accuredNumbers = []

function stringManipulater(n) {
	// Converting it into a string - so i can work with it
	number = n.toString()

	for (let i = 0; i < number.length; i++) {
		numbersList.push(number[i])
	}

	for (let i = 0; i < numbersList.length; i++) {
		accuredNumbers.push(numbersList)
		// Absolutely no idea why this works?... If i dont have the below line it will print out the same numbers
		numbersList = numbersList.filter(e => e)
		removed = numbersList.shift()
		numbersList.push(removed)
	}
	return accuredNumbers
}

console.log(stringManipulater(2468))
