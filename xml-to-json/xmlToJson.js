const convert = require('xml-js')
const fs = require('fs')
const DOMParser = require('xmldom').DOMParser
const xml = require('./xml')

// let res = convert.xml2json(xml2, { compact: false, spaces: 4 })
let doc = new DOMParser().parseFromString(xml, 'text/xml')

for (let i = 0; i < 5; i++) {
	console.log(doc.getElementsByTagName('e:Revenue')[i].textContent)
}
// console.log(doc.getElementsByTagName('contextRef="c65"'))

// fs.writeFile('json.json', res, function(err) {
// 	if (err) {
// 		return console.log(err)
// 	}
// 	console.log('File has been written')
// })
