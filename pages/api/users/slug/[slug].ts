import { NextApiHandler } from 'next'

import User from 'models/User'
import firebase from 'lib/firebase/admin'
import snapshotToUser from 'lib/snapshotToUser'

const firestore = firebase.firestore()

const handler: NextApiHandler<User | string | void> = async ({ method, query: { slug } }, res) => {
	try {
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'GET')
		
		if (method === 'OPTIONS')
			return res.send()
		
		if (method !== 'GET')
			return res.status(400).send('Invalid method')
		
		if (typeof slug !== 'string')
			return res.status(400).send('Invalid slug')
		
		const { docs } = await firestore
			.collection('users')
			.where('slug', '==', slug)
			.limit(1)
			.get()
		
		const snapshot = docs[0]
		const user = snapshot && snapshotToUser(snapshot)
		
		if (!user)
			return res.status(404).send('Not found')
		
		res.send(user)
	} catch ({ message }) {
		res.status(500).send(message)
	}
}

export default handler
