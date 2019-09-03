const fetch = require('node-fetch')
const URL = 'http://distribution.virk.dk/offentliggoerelser/_search'
const readXML = require('./xmlReader')

async function getURL() {
	const response = await fetch(
		URL,
		makeOptions('POST', {
			_source: ['dokumenter.dokumentUrl'],
			query: {
				bool: {
					must: [
						{
							term: {
								'dokumenter.dokumentMimeType': 'xml'
							}
						}
					]
				}
			},
			size: 100
		})
	)
	const json = await response.json()
	return json
}

async function exURL() {
	let URLs = []
	let json = await getURL()
	let data
	// console.log(json.hits.hits[1]._source.dokumenter[2].dokumentUrl)
	for (let i = 0; i < 100; i++) {
		data = json.hits.hits[i]._source.dokumenter
		for (let j = 0; j < data.length; j++) {
			URLs.push(data[j].dokumentUrl)
			// console.log(data.dokumentUrl)
		}
	}
	return URLs
}

function makeOptions(method, body) {
	var opts = {
		method: method,
		headers: {
			'Content-type': 'application/json'
		}
	}
	if (body) {
		opts.body = JSON.stringify(body)
	}
	return opts
}

async function initData() {
	let prefix = 'https://datacvr.virk.dk/data/offentliggorelse?dl_ref='
	let url = await exURL()
	for (let i = 0; i < url.length; i++) {
		if (url[i].split('.')[3] == 'xml') {
			let ref = url[i].split('/')[4]
			readXML(prefix + ref)
		}
	}
}

initData()
