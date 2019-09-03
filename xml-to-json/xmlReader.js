const request = require('request')
const DOMParser = require('xmldom').DOMParser

/* readXMl
 *  - variables: URL: to xml-file
 *  - this functions reads the xml-file from an url,
 *    and lets us perform our "queries" on the data
 */
function readXML(URL) {
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
	if (doc.getElementsByTagName('xbrl').length != 0) {
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
				dataHandler(doc, doc.getElementsByTagName('e:Assets').length - 1, 'e')
			}
			if (doc.getElementsByTagName(contentTag)[0].attributes[i].localName == 'fsa') {
				// <fsa> tags have the most recent data in the first element
				dataHandler(doc, 0, 'fsa')
			}
		}
	}
}

function dataHandler(doc, i, dataTag) {
	// Handles revenue
	let revenue = 0
	if (doc.getElementsByTagName(dataTag + ':Revenue').length > 0) {
		revenue = doc.getElementsByTagName(dataTag + ':Revenue')[i].textContent
	}

	// Handles grossProfitLoss
	let grossProfitLoss = 0
	if (doc.getElementsByTagName(dataTag + ':GrossProfitLoss').length > 0) {
		grossProfitLoss = doc.getElementsByTagName(dataTag + ':GrossProfitLoss')[i].textContent
	}

	// Handles grossResult
	let grossResult = 0
	if (doc.getElementsByTagName(dataTag + ':GrossResult').length > 0) {
		grossResult = doc.getElementsByTagName(dataTag + ':GrossResult')[i].textContent
	}

	// Handles period - NOTE: for FSA the elements are sorted by their start date... Unlike etags
	let contexRef = doc.getElementsByTagName(dataTag + ':ProfitLoss')[i].attributes[0].nodeValue
	let start = ''
	let end = ''
	// Reason for the loops is that the period-element occur in differenlt places
	for (let j = 0; j < doc.getElementById(contexRef).childNodes.length; j++) {
		if (doc.getElementById(contexRef).childNodes[j].localName == 'period') {
			for (let k = 0; k < doc.getElementById(contexRef).childNodes[j].childNodes.length; k++) {
				if (doc.getElementById(contexRef).childNodes[j].childNodes[k].localName == 'startDate') {
					start = doc.getElementById(contexRef).childNodes[j].childNodes[k].childNodes[0].nodeValue
				}
				if (doc.getElementById(contexRef).childNodes[j].childNodes[k].localName == 'endDate') {
					end = doc.getElementById(contexRef).childNodes[j].childNodes[k].childNodes[0].nodeValue
				}
			}
		}
	}

	// TEST AREA //
	console.log('Revenue:', revenue, 'GPL:', grossProfitLoss, 'GR:', grossResult)
	console.log('Period:', start, '-', end)
	console.log('========================================')
}

module.exports = readXML
