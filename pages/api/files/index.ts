import { NextApiHandler, PageConfig } from 'next'
import { getExtension } from 'mime'

import FileMeta from 'models/FileMeta'
import { MAX_FILE_SIZE } from 'lib/constants'
import firebase from 'lib/firebase/admin'
import newId from 'lib/newId'
import snapshotToUser from 'lib/snapshotToUser'

const AUTHORIZATION_REGEX = /^Bearer (.+)$/

const { FieldValue } = firebase.firestore

const firestore = firebase.firestore()
const storage = firebase.storage().bucket()

const getApiKey = (authorization: string | undefined) =>
	authorization?.match(AUTHORIZATION_REGEX)?.[1]

const getUserFromApiKey = async (apiKey: string) => {
	const { empty, docs } = await firestore
		.collection('users')
		.where('apiKey', '==', apiKey)
		.limit(1)
		.get()

	return empty ? null : snapshotToUser(docs[0], true)
}

const handler: NextApiHandler<FileMeta | string | void> = async (
	{ method, headers, body },
	res
) => {
	try {
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'POST')
		res.setHeader('Access-Control-Allow-Headers', [
			'Authorization',
			'Content-Type'
		])

		if (method === 'OPTIONS') return res.send()
		if (method !== 'POST') return res.status(400).send('Invalid method')

		if (typeof body !== 'object') return res.status(400).send('Invalid body')

		const apiKey = getApiKey(headers.authorization)
		if (!apiKey) return res.status(400).send('Missing API key')

		const { name, type, public: isPublic, data } = body

		if (
			!(
				typeof name === 'string' &&
				name &&
				typeof type === 'string' &&
				type &&
				typeof isPublic === 'boolean' &&
				typeof data === 'string' &&
				data
			)
		)
			return res.status(400).send('Invalid body')

		const indexOfDot = name.lastIndexOf('.')
		const extension = ~indexOfDot
			? name.slice(indexOfDot + 1)
			: getExtension(type)

		if (!extension) return res.status(400).send('Invalid type')

		const id = `${newId()}.${extension}`
		const file = Buffer.from(data, 'base64')
		const size = file.byteLength

		if (size > MAX_FILE_SIZE)
			return res.status(400).send('File too large, maximum is 10 GB')

		const user = await getUserFromApiKey(apiKey)
		if (!user) return res.status(400).send('Invalid API key')

		await storage.file(id).save(file, {
			public: true,
			gzip: true,
			metadata: {
				contentType: type,
				contentDisposition: `inline; filename=${JSON.stringify(name)}`,
				cacheControl: 'public, max-age=31536000, s-maxage=31536000',
				metadata: { name, owner: user.id }
			}
		})

		await firestore.doc(`files/${id}`).set({
			name,
			type,
			size,
			owner: user.id,
			comments: 0,
			uploaded: FieldValue.serverTimestamp(),
			public: isPublic
		})

		res.send({
			id,
			name,
			type,
			size,
			owner: user.id,
			comments: 0,
			uploaded: Date.now(),
			public: isPublic
		})
	} catch ({ message }) {
		res.status(500).send(message)
	}
}

export const config: PageConfig = {
	api: {
		bodyParser: { sizeLimit: MAX_FILE_SIZE }
	}
}

export default handler
