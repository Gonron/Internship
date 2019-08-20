// NOTE: this is a VERY bad solution, can't remember how to remove an entry from a list... Intellisene isn't working for me atm :(

function stringHandler(str) {
	let chars = []
	let charsToRemove = []
	let res = []

	for (let i = 0; i < str.length; i++) {
		chars.push(str[i])
		if (str[i + 1] === '*') {
			// console.log('* Detected removing', str[i])
			charsToRemove.push(str[i])
		}
		if (str[i - 1] === '*') {
			// console.log('* Detected removing', str[i])
			charsToRemove.push(str[i])
		}
	}

	for (let i = 0; i < chars.length; i++) {
		if (!charsToRemove.includes(chars[i])) {
			res.push(chars[i])
		}
	}
	res = res.filter(char => char != '*')
	return res
}

console.log(stringHandler('*abcde'))
console.log(stringHandler('ab*cde'))
console.log(stringHandler('ab*cde***ef'))
console.log(stringHandler('a*bc*de*f'))
