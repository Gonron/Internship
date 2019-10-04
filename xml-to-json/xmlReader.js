const request = require('request')
const DOMParser = require('xmldom').DOMParser

/* readXMl
 *  - variables: URL: to xml-file
 *  - this functions reads the xml-file from an url,
 *    and lets us perform our "queries" on the data
 */
async function readXML(URL) {
	request.get(URL, function(error, response, data) {
		if (!error && response.statusCode == 200) {
			let doc = new DOMParser({
				// This is to keep the console clear from xmldom warnings
				locator: {},
				errorHandler: {
					warning: function(w) {},
					error: function(e) {},
					fatalError: function(e) {
						console.error(e)
					}
				}
			}).parseFromString(data, 'application/xml')
			console.log(URL)
			contentTagHandler(doc)
		}
	})
}

/* contentTagHandler
 *  - variables: doc: DOMParser
 *  - this functions handles the "content-tags";
 *    which can be <xbrl> or <xbrli:xbrl>
 */
function contentTagHandler(doc) {
	if (doc.getElementsByTagName('xbrl').length !== 0) {
		// File uses xbrl
		dataTagHandler(doc, 'xbrl')
	} else {
		// File uses xbrli
		dataTagHandler(doc, 'xbrli:xbrl')
	}
}

/* dataTagHandler
 *  - variables: contantTag: <xbrl> or <xbrli:xbrl>
 *               doc: DOMParser
 *  - this functions handles the "data-tags";
 *    which can be <fsa> or <e>
 *  - NOTE: there can also be a <GOSU_XXXXxxxxx> tag which is
 *    difficult to handle, so we ignore it
 */
function dataTagHandler(doc, contentTag) {
	// Checks if file is valid
	if (doc.getElementsByTagName(contentTag)[0] !== undefined) {
		for (let i = 0; i < doc.getElementsByTagName(contentTag)[0].attributes.length; i++) {
			if (doc.getElementsByTagName(contentTag)[0].attributes[i].localName == 'e') {
				// <e> tags have the most recent data in the 2nd last element
				// TOOD: change the 'e:Assets' to be something more dynaic
				// 		 Otherwiese we get into trouble if some data don't have same length
				console.log('e')
				dataHandler(doc, 'e', 'c')
			}
			if (doc.getElementsByTagName(contentTag)[0].attributes[i].localName == 'fsa') {
				// <fsa> tags have the most recent data in the first element
				console.log('fsa')
				dataHandler(doc, 'fsa', 'gsd')
			}
		}
	}
}

/* dataHandæer
 *	- variables: doc: DOMParser
 *				 i: the number of the element in the list
 *				 dataTag: <fsa> or <e>
 *				 cvrTag: <gsd> or <c>
 *	- this function handles data, i.e. prepares the data to be
 *	  insertet into the db
 */

function dataHandler(doc, dataTag, cvrTag) {
	try {
		let i
		// Handles CVR
		cvr = doc.getElementsByTagName(cvrTag + ':IdentificationNumberCvrOfReportingEntity')[0].textContent

		// Handles revenue
		let revenue = 0
		if (doc.getElementsByTagName(dataTag + ':Revenue').length > 0) {
			dataTag == 'e' ? (i = doc.getElementsByTagName(dataTag + ':Revenue').length - 2) : (i = 0)
			revenue = doc.getElementsByTagName(dataTag + ':Revenue')[i].textContent
		}

		// Handles grossProfitLoss
		let grossProfitLoss = 0
		if (doc.getElementsByTagName(dataTag + ':GrossProfitLoss').length > 0) {
			dataTag == 'e' ? (i = doc.getElementsByTagName('e:GrossProfitLoss').length - 2) : (i = 0)
			grossProfitLoss = doc.getElementsByTagName(dataTag + ':GrossProfitLoss')[i].textContent
		}

		// Handles grossResult
		let grossResult = 0
		if (doc.getElementsByTagName(dataTag + ':GrossResult').length > 0) {
			dataTag == 'e' ? (i = doc.getElementsByTagName('e:GrossResult').length - 2) : (i = 0)
			grossResult = doc.getElementsByTagName(dataTag + ':GrossResult')[i].textContent
		}

		// Handles taxExpense
		let taxExpense = 0
		if (doc.getElementsByTagName(dataTag + ':TaxExpense').length > 0) {
			dataTag == 'e' ? (i = doc.getElementsByTagName('e:TaxExpense').length - 2) : (i = 0)
			taxExpense = doc.getElementsByTagName(dataTag + ':TaxExpense')[i].textContent
		}

		// Handles currentTaxExpense
		let currentTaxExpense = 0
		if (doc.getElementsByTagName(dataTag + ':CurrentTaxExpense').length > 0) {
			dataTag == 'e' ? (i = doc.getElementsByTagName('e:CurrentTaxExpense').length - 2) : (i = 0)
			currentTaxExpense = doc.getElementsByTagName(dataTag + ':CurrentTaxExpense')[i].textContent
		}

		// Handles assets
		let assets = 0
		if (doc.getElementsByTagName(dataTag + ':Assets').length > 0) {
			dataTag == 'e' ? (i = doc.getElementsByTagName('e:Assets').length - 2) : (i = 0)
			assets = doc.getElementsByTagName(dataTag + ':Assets')[i].textContent
		}

		// Handles currentAssets
		let currentAssets = 0
		if (doc.getElementsByTagName(dataTag + ':CurrentAssets').length > 0) {
			dataTag == 'e' ? (i = doc.getElementsByTagName('e:CurrentAssets').length - 2) : (i = 0)
			currentAssets = doc.getElementsByTagName(dataTag + ':CurrentAssets')[i].textContent
		}

		// Handles shorttermLiabilitiesOtherThanProvisions
		let shorttermLiabilitiesOtherThanProvisions = 0
		if (doc.getElementsByTagName(dataTag + ':ShorttermLiabilitiesOtherThanProvisions').length > 0) {
			dataTag == 'e' ? (i = doc.getElementsByTagName('e:ShorttermLiabilitiesOtherThanProvisions').length - 2) : (i = 0)
			shorttermLiabilitiesOtherThanProvisions = doc.getElementsByTagName(dataTag + ':ShorttermLiabilitiesOtherThanProvisions')[i].textContent
		}

		// Handles longtermLiabilitiesOtherThanProvisions
		let longtermLiabilitiesOtherThanProvisions = 0
		if (doc.getElementsByTagName(dataTag + ':LongtermLiabilitiesOtherThanProvisions').length > 0) {
			dataTag == 'e' ? (i = doc.getElementsByTagName('e:LongtermLiabilitiesOtherThanProvisions').length - 2) : (i = 0)
			longtermLiabilitiesOtherThanProvisions = doc.getElementsByTagName(dataTag + ':LongtermLiabilitiesOtherThanProvisions')[i].textContent
		}

		// Handles equity
		let equity = 0
		if (doc.getElementsByTagName(dataTag + ':Equity').length > 0) {
			dataTag == 'e' ? (i = doc.getElementsByTagName('e:Equity').length - 2) : (i = 0)
			equity = doc.getElementsByTagName(dataTag + ':Equity')[i].textContent
		}

		// Handles profitLoss
		let profitLoss = 0
		if (doc.getElementsByTagName(dataTag + ':ProfitLoss').length > 0) {
			dataTag == 'e' ? (i = doc.getElementsByTagName('e:ProfitLoss').length - 2) : (i = 0)
			profitLoss = doc.getElementsByTagName(dataTag + ':ProfitLoss')[i].textContent
		}

		// Handles employeeBenefitsExpense
		let employeeBenefitsExpense = 0
		if (doc.getElementsByTagName(dataTag + ':EmployeeBenefitsExpense').length > 0) {
			dataTag == 'e' ? (i = doc.getElementsByTagName('e:EmployeeBenefitsExpense').length - 2) : (i = 0)
			employeeBenefitsExpense = doc.getElementsByTagName(dataTag + ':EmployeeBenefitsExpense')[i].textContent
		}

		// Handles averageNumberOfEmployees
		let averageNumberOfEmployees = 0
		if (doc.getElementsByTagName(dataTag + ':AverageNumberOfEmployees').length > 0) {
			dataTag == 'e' ? (i = doc.getElementsByTagName('e:AverageNumberOfEmployees').length - 2) : (i = 0)
			averageNumberOfEmployees = doc.getElementsByTagName(dataTag + ':AverageNumberOfEmployees')[i].textContent
		}

		// Handles period - NOTE: for FSA the elements are sorted by their start date... Unlike etags
		// Reason for the loop, is that the 'contextRef' can appear different places
		// let contextRef = ''
		// dataTag == 'e' ? (i = doc.getElementsByTagName('e:ProfitLoss').length - 2) : (i = 0)
		// for (let j = 0; j < doc.getElementsByTagName(dataTag + ':ProfitLoss')[i].attributes.length; j++) {
		// 	if (doc.getElementsByTagName(dataTag + ':ProfitLoss')[i].attributes[j].nodeName == 'contextRef') {
		// 		contextRef = doc.getElementsByTagName(dataTag + ':ProfitLoss')[i].attributes[j].nodeValue
		// 	}
		// }

		// let start = ''
		// let end = ''
		// // Reason for the loops is that the period-element occur in differenlt places
		// for (let j = 0; j < doc.getElementById(contextRef).childNodes.length; j++) {
		// 	if (doc.getElementById(contextRef).childNodes[j].localName == 'period') {
		// 		for (let k = 0; k < doc.getElementById(contextRef).childNodes[j].childNodes.length; k++) {
		// 			if (doc.getElementById(contextRef).childNodes[j].childNodes[k].localName == 'startDate') {
		// 				start = doc.getElementById(contextRef).childNodes[j].childNodes[k].childNodes[0].nodeValue
		// 			}
		// 			if (doc.getElementById(contextRef).childNodes[j].childNodes[k].localName == 'endDate') {
		// 				end = doc.getElementById(contextRef).childNodes[j].childNodes[k].childNodes[0].nodeValue
		// 			}
		// 		}
		// 	}
		// }

		let start = doc.getElementsByTagName(cvrTag + ':ReportingPeriodStartDate')[0].textContent
		let end = doc.getElementsByTagName(cvrTag + ':ReportingPeriodEndDate')[0].textContent

		// TEST AREA //
		console.log('CVR:', cvr)
		console.log('Revenue:', revenue, 'GPL:', grossProfitLoss, 'GR:', grossResult)
		// console.log('taxExpense', taxExpense)
		// console.log('currentTaxExpense', currentTaxExpense)
		// console.log('assets', assets)
		// console.log('currentAssets', currentAssets)
		// console.log('shortterm', shorttermLiabilitiesOtherThanProvisions)
		// console.log('longterm', longtermLiabilitiesOtherThanProvisions)
		// console.log('equity', equity)
		// console.log('profitLoss', profitLoss)
		// console.log('empExpense', employeeBenefitsExpense)
		// console.log('#employees', averageNumberOfEmployees)
		console.log('Period:', start, '-', end)
		console.log('========================================')
	} catch {
		console.log('Error!')
	}
}

// readXML('https://datacvr.virk.dk/data/offentliggorelse?dl_ref=ZG9rdW1lbnRsYWdlcjovLzAzLzNmLzdkLzBlLzRkLzA0ZjUtNGY4Ni1hM2QxLWY4NGRjOWM0MzMzYg.xml')
module.exports = readXML
