import fetch from 'node-fetch'

import type * as Filein from '../types'

const URL_REGEX = /^https:\/\/storage\.googleapis\.com\/file\-in\.appspot\.com\/files\/([^\s\/]+)$/

const upload = async (
	data: Buffer,
	contentType?: string | null | undefined
): Promise<Filein.File> => {
	const url = await (
		await fetch('https://file-in.web.app/upload', {
			method: 'POST',
			body: data,
			headers: contentType
				? { 'Content-Type': contentType }
				: undefined
		})
	).text()
	
	const id = urlToId(url)
	
	if (!id)
		throw new Error(`Unable to parse the file ID from the file URL "${url}"`)
	
	return { id, url, data }
}

const download = async (id: string): Promise<Filein.File> => {
	const url = idToUrl(id)
	
	return {
		id,
		url,
		data: await (await fetch(url)).buffer()
	}
}

const idToUrl = (id: string) =>
	`https://storage.googleapis.com/file-in.appspot.com/files/${id}`

const urlToId = (url: string) =>
	url.match(URL_REGEX)?.[1] || null

module.exports = upload

module.exports.upload = upload
module.exports.download = download
module.exports.idToUrl = idToUrl
module.exports.urlToId = urlToId
