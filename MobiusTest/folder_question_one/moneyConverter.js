/* NOTES:
 *  I decided to skip to the next question after 45mins of struggling with this one
 *  Problems where that i could get the while loop to call coinsConverter more then once -
 *  after that the issue was to figure out a smarter way to sepperate the coins.
 */

let money = {
	// Setting up a bills object
	bills: {
		fifty: 0,
		hundred: 0,
		twoHundred: 0,
		fiveHundred: 0,
		thousand: 0
	},
	// Seeting up a coins object
	coins: {
		half: 0,
		one: 0,
		two: 0,
		five: 0,
		ten: 0,
		twenty: 0
	}
}
function moneyConverter(cash, money) {
	// console.log("test1")
	while (cash > 0) {
		if (cash < 50) {
			console.log('before', cash)
			coinsConverter(cash, money)
			console.log('after', cash)
		} else {
			billsConverter(cash, money)
		}
		return money
	}
}

function coinsConverter(cash, coins) {
	if (cash >= 20) {
		money.coins.twenty += 1
		cash -= 20
	} else if (testCash >= 10) {
		money.coins.ten += 1
		cash -= 10
	}
	// } else if (cash > 5) {
	// 	coins.five += 1
	// } else if (cash > 2) {
	// 	coins.two += 1
	// } else if (cash > 1) {
	// 	coins.one += 1
	// } else if (cash > 0.5) {
	// 	coins.half += 1
	// }
	return cash
}

function billsConverter(cash, bills) {
	return bills
}

console.log(moneyConverter(40, money))
