const DOMParser = require('xmldom').DOMParser
const xml = require('./xml3')
let doc = new DOMParser().parseFromString(xml, 'text/xml')

let revTag = ''
if (doc.getElementsByTagName('e:Revenue').length > 0) {
	revTag = 'e:Revenue'
} else {
	revTag = 'e:GrossProfitLoss'
}

function dataHandlerE(x) {
	for (let i = x; i < doc.getElementsByTagName(revTag).length; i++) {
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
		let empExpenses = doc.getElementsByTagName('e:EmployeeBenefitsExpense')[i - x].textContent // length = 4
		let taxExpenses = doc.getElementsByTagName('e:TaxExpense')[i - x].textContent // length = 2
		let profitLoss = doc.getElementsByTagName('e:ProfitLoss')[i].textContent
		let equity = doc.getElementsByTagName('e:Equity')[i].textContent

		// Handles period - NOTE: Only the first two years have the correct assigned period. (placed as 4 and 3 in the array)
		let contexRef = doc.getElementsByTagName(revTag)[i].attributes[0].nodeValue
		let start = doc.getElementById(contexRef).childNodes[3].childNodes[1].childNodes[0]
			.nodeValue
		let end = doc.getElementById(contexRef).childNodes[3].childNodes[3].childNodes[0].nodeValue

		// TEST AREA //
		console.log('Period:', start, '-', end)
	}
}

function dataHandlerFSA() {
	for (let i = 0; i < 2; i++) {
		//Handles data
		let revenue = doc.getElementsByTagName('fsa:Revenue')[i].textContent
		let grossProfitLoss = doc.getElementsByTagName('fsa:GrossProfitLoss')[i].textContent
		// let empExpenses = doc.getElementsByTagName('fsa:EmployeeBenefitsExpense')[i].textContent // length = 4
		let taxExpenses = doc.getElementsByTagName('fsa:TaxExpense')[i].textContent // length = 2
		let profitLoss = doc.getElementsByTagName('fsa:ProfitLoss')[i].textContent
		let equity = doc.getElementsByTagName('fsa:Equity')[i].textContent

		// Handles period - NOTE: for FSA the elements are sorted by their start date... Unlike etags
		let contexRef = doc.getElementsByTagName('fsa:Revenue')[i].attributes[0].nodeValue
		let start = doc.getElementById(contexRef).childNodes[3].childNodes[1].childNodes[0]
			.nodeValue
		let end = doc.getElementById(contexRef).childNodes[3].childNodes[3].childNodes[0].nodeValue

		// TEST AREA //
		console.log('Revenue:', revenue)
		console.log('GPL:', grossProfitLoss)
		console.log('Period:', start, '-', end)
	}
}

// let eTag = doc.getElementsByTagName('xbrl')[0].attributes[8].localName
// This is to check wether the file uses e or fsa
if (doc.getElementsByTagName('xbrl').length != 0) {
	// This is to ensure we're only geting the two recent years from each xml-fiæe
	// As stated at period, only the two most recent years have the correctly assigned start and end date.
	if (doc.getElementsByTagName(revTag).length == 5) {
		// Gets the last two sets of data where a report contains 5 years of information
		dataHandlerE(3)
	} else {
		// Gets the last two sets of data where a report contains 2 years of information
		dataHandlerE(0)
	}
	console.log('e')
} else {
	dataHandlerFSA()
	console.log('fsa')
}
