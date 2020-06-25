import fetch from 'node-fetch'

import * as Filein from '../types'

const URL_REGEX = /^https:\/\/storage\.googleapis\.com\/file\-in\.appspot\.com\/files\/([^\s\/]+)$/

export const upload = async (
	data: Buffer,
	contentType?: string | null | undefined
): Promise<Filein.File> => {
	const url = await (
		await fetch('https://file-in.web.app', {
			method: 'POST',
			body: data,
			headers: contentType
				? { 'Content-Type': contentType }
				: undefined
		})
	).text()
	
	const id = urlToId(url)
	
	if (!id)
		throw new Error('Unable to parse the file ID from the file URL')
	
	return { id, url, data }
}

export const download = async (id: string): Promise<Filein.File> => {
	const url = idToUrl(id)
	
	return {
		id,
		url,
		data: await (await fetch(url)).buffer()
	}
}

export const idToUrl = (id: string) =>
	`https://storage.googleapis.com/file-in.appspot.com/files/${id}`

export const urlToId = (url: string) =>
	url.match(URL_REGEX)?.[1] ?? null

module.exports = upload
