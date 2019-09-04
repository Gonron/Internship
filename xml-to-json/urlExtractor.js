const fetch = require('node-fetch')
const URL = 'http://distribution.virk.dk/offentliggoerelser/_search'
const readXML = require('./xmlReader')

async function getURL(cvr) {
	const response = await fetch(
		URL,
		makeOptions('POST', {
			_source: ['dokumenter.dokumentUrl'],
			query: {
				bool: {
					must: [
						{
							term: {
								cvrNummer: cvr
							}
						},
						{
							term: {
								'dokumenter.dokumentMimeType': 'xml'
							}
						}
					]
				}
			}
		})
	)
	const json = await response.json()
	return json
}

async function exURL() {
	let cvr = ['36391731', '38828436', '28106866', '20385073', '34692858']
	// let cvr = ['13590400']
	let URLs = []
	for (let x = 0; x < cvr.length; x++) {
		let json = await getURL(cvr[x])

		let data
		console.log(json.hits.total)
		for (let i = 0; i < json.hits.total; i++) {
			data = json.hits.hits[i]._source.dokumenter
			for (let j = 0; j < data.length; j++) {
				URLs.push(data[j].dokumentUrl)
			}
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
			await readXML(prefix + ref)
		}
	}
}

initData()
