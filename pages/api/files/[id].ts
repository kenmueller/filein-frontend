import { NextApiHandler } from 'next'

import FileMeta from 'models/FileMeta'
import firebase from 'lib/firebase/admin'
import snapshotToFileMeta from 'lib/snapshotToFileMeta'

const firestore = firebase.firestore()

const handler: NextApiHandler<FileMeta | string | void> = async ({ method, query: { id } }, res) => {
	try {
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'GET')
		
		if (method === 'OPTIONS')
			return res.send()
		
		if (method !== 'GET')
			return res.status(400).send('Invalid method')
		
		if (typeof id !== 'string')
			return res.status(400).send('Invalid ID')
		
		const file = snapshotToFileMeta(await firestore.doc(`files/${id}`).get())
		
		if (!file)
			return res.status(404).send('Not found')
		
		res.send(file)
	} catch ({ message }) {
		res.status(500).send(message)
	}
}

export default handler
