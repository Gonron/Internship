const DOMParser = require('xmldom').DOMParser
const xml = require('./xml')

let doc = new DOMParser().parseFromString(xml, 'text/xml')

/* TODO:
 *	- find a way to identify if an xml file uses fsa or e
 *	- make it so it takes an url instead of a file
 *
 */

// // Tag handler
// let tag = ''
// if (doc.getElementsByTagName('e:Assets').length > 0) {
// 	console.log('e')
// 	tag = 'e:'
// } else {
// 	console.log('fsa')
// 	tag = 'fsa:'
// }

// Handler for different revenue names
let revTag = ''
if (doc.getElementsByTagName('e:Revenue').length > 0) {
	revTag = 'e:Revenue'
} else {
	revTag = 'e:GrossProfitLoss'
}

// To get data with a <period> tag
for (let i = 0; i < doc.getElementsByTagName(revTag).length; i++) {
	// Handles revenue
	let revenue = 0
	if (doc.getElementsByTagName('e:Revenue').length > 0) {
		revenue = doc.getElementsByTagName('e:Revenue')[i].textContent
	} else {
		revenue = 0
	}

	// Handles grossProfitLoss
	let grossProfitLoss = 0
	if (doc.getElementsByTagName('e:GrossProfitLoss').length > 0) {
		grossProfitLoss = doc.getElementsByTagName('e:GrossProfitLoss')[i].textContent
	} else {
		grossProfitLoss = 0
	}

	//Handles rest of the data
	// let empExpenses = doc.getElementsByTagName('e:EmployeeBenefitsExpense')[i].textContent // 4
	// let taxExpenses = doc.getElementsByTagName('e:TaxExpense')[i].textContent // 2
	let profitLoss = doc.getElementsByTagName('e:ProfitLoss')[i].textContent
	let equity = doc.getElementsByTagName('e:Equity')[i].textContent

	// Handles period - NOTE: Only the first two years have the correct assigned period. (placed as 4 and 3 in the array)
	let contexRef = doc.getElementsByTagName(revTag)[i].attributes[0].nodeValue
	let start = doc.getElementById(contexRef).childNodes[3].childNodes[1].childNodes[0].nodeValue
	let end = doc.getElementById(contexRef).childNodes[3].childNodes[3].childNodes[0].nodeValue

	// TEST AREA //
	console.log(revenue, grossProfitLoss, profitLoss, equity, start, end)
}
// let l = doc.getElementsByTagName(revTag).length
// let arr = doc.getElementsByTagName(revTag)

// for (let i = 0; i < l; i++) {
// 	if (i >= l - 1) {
// 		console.log(i)
// 	}
// }

// // To get data with a <instant> tag
// for (let i = 0; i < doc.getElementsByTagName('e:Assets').length; i++) {
// 	let data = doc.getElementsByTagName('e:Assets')[i].textContent
// 	let ref = doc.getElementsByTagName('e:Assets')[i].attributes[0].nodeValue
// 	let period = doc.getElementById(ref).childNodes[3].childNodes[1].childNodes[0].nodeValue
// 	console.log(ref, period, data)
// }
