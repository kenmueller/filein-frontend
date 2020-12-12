import { NextApiHandler } from 'next'
import { getExtension } from 'mime'

import firebase from 'lib/firebase/admin'
import newId from 'lib/newId'

const { FieldValue } = firebase.firestore

const firestore = firebase.firestore()
const storage = firebase.storage().bucket()

const uploadFile: NextApiHandler<string | void> = async ({ method, body }, res) => {
	try {
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'POST')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
		
		if (method === 'OPTIONS')
			return res.send()
		
		if (method !== 'POST')
			return res.status(400).send('Invalid method')
		
		if (typeof body !== 'object')
			return res.status(400).send('Invalid body')
		
		const { name, type, public: isPublic, data } = body
		
		if (!(
			typeof name === 'string' && name &&
			typeof type === 'string' && type &&
			typeof isPublic === 'boolean' &&
			typeof data === 'string' && data
		))
			return res.status(400).send('Invalid body')
		
		const indexOfDot = name.lastIndexOf('.')
		const extension = ~indexOfDot
			? name.slice(indexOfDot + 1)
			: getExtension(type)
		
		if (!extension)
			return res.status(400).send('Invalid type')
		
		const id = `${newId()}.${extension}`
		const file = Buffer.from(data, 'binary')
		
		await storage.file(id).save(file, {
			public: true,
			gzip: true,
			metadata: {
				contentType: type,
				cacheControl: 'public, max-age=31536000, s-maxage=31536000',
				metadata: { name, owner: null }
			}
		})
		
		await firestore.doc(`files/${id}`).set({
			name,
			type,
			size: file.byteLength,
			owner: null,
			comments: 0,
			uploaded: FieldValue.serverTimestamp(),
			public: isPublic
		})
		
		res.send(id)
	} catch ({ message }) {
		res.status(500).send(message)
	}
}

export default uploadFile
