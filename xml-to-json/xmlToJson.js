const DOMParser = require('xmldom').DOMParser
const xml = require('./xml2')

let doc = new DOMParser().parseFromString(xml, 'text/xml')

/* TODO:
 *	- find a way to identify if an xml file uses fsa or e
 *	- make it so it takes an url instead of a file
 *
 */

// Handler for different revenue names
let revTag = ''
if (doc.getElementsByTagName('e:Revenue').length > 0) {
	console.log('rev')
	revTag = 'e:Revenue'
} else {
	console.log('gpl')
	revTag = 'e:GrossProfitLoss'
}

// To get data with a <period> tag
for (let i = 0; i < doc.getElementsByTagName(revTag).length; i++) {
	let revenue = doc.getElementsByTagName(revTag)[i].textContent
	let contexRef = doc.getElementsByTagName(revTag)[i].attributes[0].nodeValue
	let start = doc.getElementById(contexRef).childNodes[3].childNodes[1].childNodes[0].nodeValue
	let end = doc.getElementById(contexRef).childNodes[3].childNodes[3].childNodes[0].nodeValue
	console.log('rev:', revenue, '- ref:', contexRef, '- sDate:', start, '- eDate', end)
}

// To get data with a <instant> tag
for (let i = 0; i < doc.getElementsByTagName('e:Assets').length; i++) {
	let data = doc.getElementsByTagName('e:Assets')[i].textContent
	let ref = doc.getElementsByTagName('e:Assets')[i].attributes[0].nodeValue
	let period = doc.getElementById(ref).childNodes[3].childNodes[1].childNodes[0].nodeValue
	console.log(ref, period, data)
}
