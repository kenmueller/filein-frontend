import firebase from './firebase'
import snapshotToUser from './snapshotToUser'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getUserFromSlug = async (slug: string) => {
	const { empty, docs } = await firestore
		.collection('users')
		.where('slug', '==', slug)
		.limit(1)
		.get()
	
	return empty ? null : snapshotToUser(docs[0])
}

export default getUserFromSlug
